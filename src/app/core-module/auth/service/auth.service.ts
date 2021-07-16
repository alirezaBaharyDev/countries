import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router
  ) {
  }

  /**
   * Add logged true in localStorage
   * Redirect to panel
   */
  login() {
    localStorage.setItem('logged', JSON.stringify(true));
    this.router.navigateByUrl('/panel');
  }

  /**
   * Remove logged from localStorage
   * Redirect to signIn
   */
  logout(): void {
    localStorage.removeItem('logged');
    this.router.navigateByUrl('/auth/signIn')
  }


  /**
   * Check the login from localStorage
   * If logged === true, redirected to the panel
   * If logged === (false || null || undefined), redirected to the signIn
   */
  loginCheck(changeRoute?: boolean): Observable<any> {
    const logged = new BehaviorSubject<Boolean>(false);
    if (JSON.parse(<any>localStorage.getItem('logged'))) {
      logged.next(true);
    } else {
      logged.next(false);
      if (changeRoute) {
        this.router.navigateByUrl('/auth');
      }
    }
    return logged.asObservable()
  }


  /**
   * Get new token
   */
  refreshToken() {
    // add your refresh token service in here
    // return new token to set localStorage
  }
}
