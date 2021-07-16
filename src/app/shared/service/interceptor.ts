import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import {AuthService} from "../../core-module/auth/service/auth.service";
import {catchError, concatMap, delay, filter, retryWhen, switchMap, take, tap} from "rxjs/operators";
import {NgxNotificationMsgService, NgxNotificationStatusMsg} from "ngx-notification-msg";

@Injectable({
  providedIn: "root"
})
export class Interceptor implements HttpInterceptor {
  private isTokenRefreshing: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(<any>null)

  constructor(private authService: AuthService ,private ngxNotificationMsgService: NgxNotificationMsgService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('Success');
        }
      }),
      // if error status === 500 or 0
      // retry request 3 times
      // every 2 second;
      retryWhen(errors => errors
        .pipe(
          concatMap((error, count) => {
            if (count < 3 && (error.status == 500 || error.status == 0)) {
              return of(error.status);
            }
            return throwError(error);
          }),
          delay(2000)
        )
      ),
      catchError((err:any): Observable<any> => {
        if (err instanceof HttpErrorResponse) {
          this.errorHandler(err , request , next)
          return throwError(err);
        } else {
          return throwError(err);
        }
      }) ,
      )
  }


  /**
   *Get token from localStorage
   *Check token exist
   *Add token to request headers and return request :  if token exist
   *
   * @param request
   * @private
   */
  private attachTokenToRequest(request: HttpRequest<any>) {
    let token = localStorage.getItem('access-token');
    if (token) {
      return request.clone({setHeaders: {Authorization: `${token}`}})
    }
    return request;
  }

  /**
   * handle http response error
   * @param httpErrorResponse
   * @param request
   * @param next
   * @private
   */
  private errorHandler(httpErrorResponse: HttpErrorResponse,request: HttpRequest<any>, next: HttpHandler): any {
    switch (httpErrorResponse.status) {
      case 500:
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.FAILURE,
          header: 'خطا',
          color: 'red',
          messages: ['خطای اتصال به سرور']
        });
        break;
      case 0:
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.FAILURE,
          header: 'خطا',
          color: 'red',
          messages: ['اتصال اینترنتی خود را بررسی نمایید.']
        });
        break;
      case 404:
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.INFO,
          messages: ['موردی یافت نشد']
        });
        break;
      case 400:
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.FAILURE,
          header: 'خطا',
          color: 'red',
          messages: ['نوع اطلاعات وارد شده صحیح نمی باشد، لطفا بررسی و اصلاح نمائید.']
        });
        break;
      case 401:
        //token expired . refresh token
      return this.handleRefreshToken(request, next)

      case 403:
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.FAILURE,
          header: 'خطا',
          color: 'red',
          messages: ['دسترسی شما به این سرویس محدود می باشد.']
        });
        break;
      default:
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.FAILURE,
          header: 'خطا',
          color: 'red',
          messages: [httpErrorResponse?.error?.message]
        });
    }
  }


  /**
   * Handle refresh token
   * @param request
   * @param next
   * @private
   */
  private handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    // first thing to check if the token is in process of refreshing
    if (!this.isTokenRefreshing) { // if the token refreshing is not true
      this.isTokenRefreshing = true;

      // any existing value is set to null
      // reset here so that the following request wait until the token comes back from the refresh token api call
      this.tokenSubject.next(<any>null);

      // call the api to refresh the token and return
      // این قسمت رو کامنت کردم چون سرویس رفرش توکنی ندارم .
      // return this.authService.refreshToken().pipe(
      //   switchMap((tokenResponse: any) => {
      //       if (tokenResponse) {
      //         localStorage.setItem('access-token', tokenResponse.token);
      //         return next.handle(this.attachTokenToRequest(request));
      //       }
      //       // add here your logout api
      //       return this.authService.logout();
      //     })
      //   , catchError(err => {
      //     this.authService.logout();
      //     return throwError(err)
      //   })
      //   , finalize(() => this.isTokenRefreshing = false));
      return;
    } else {
      this.isTokenRefreshing = false
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.attachTokenToRequest(request));
        })
      )
    }
  }

}
