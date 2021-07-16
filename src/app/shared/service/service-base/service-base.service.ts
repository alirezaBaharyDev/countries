import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RestExtra} from "./helper/rest-extra";
import {ConfigHelperService} from "./config-helper.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceBaseService {


  constructor(public configHelperService: ConfigHelperService, public httpClient: HttpClient) {
  }

  getService(restExtra: RestExtra): Observable<any> {
    let httpHeaders = new HttpHeaders();
    let url = this.configHelperService.getUrl(restExtra);
    httpHeaders = this.configHelperService.getHttpHeaders(httpHeaders, restExtra);
    return this.httpClient.get(url,
      {
        headers: httpHeaders,
        responseType: this.configHelperService.getResponseContentType(restExtra.responseContentType)
      }
    )
  }

  postService(value: any, restExtra: RestExtra): any {
    let httpHeaders = new HttpHeaders();
    let url = this.configHelperService.getUrl(restExtra);
    httpHeaders = this.configHelperService.getHttpHeaders(httpHeaders, restExtra);
    return this.httpClient.post(url,value ,
      {
        headers: httpHeaders,
        responseType: this.configHelperService.getResponseContentType(restExtra.responseContentType)
      }
    )
  }

  putService(value: any, restExtra: RestExtra): any {
    let httpHeaders = new HttpHeaders();
    let url = this.configHelperService.getUrl(restExtra);
    httpHeaders = this.configHelperService.getHttpHeaders(httpHeaders, restExtra);
    return this.httpClient.put(url,value ,
      {
        headers: httpHeaders,
        responseType: this.configHelperService.getResponseContentType(restExtra.responseContentType)
      }
    )
  }

  deleteService(restExtra: RestExtra) {
    let httpHeaders = new HttpHeaders();
    let url = this.configHelperService.getUrl(restExtra);
    httpHeaders = this.configHelperService.getHttpHeaders(httpHeaders, restExtra);
    return this.httpClient.delete(url ,
      {
        headers: httpHeaders,
        responseType: this.configHelperService.getResponseContentType(restExtra.responseContentType)
      }
    )
  }


}


