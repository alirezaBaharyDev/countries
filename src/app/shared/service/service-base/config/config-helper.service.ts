import {Injectable} from '@angular/core';
import {RestExtra} from "../helper interface/rest-extra";
import {MAIN_SERVER_URL} from "./server-url-config";
import {HttpHeaders} from "@angular/common/http";
import {TokenMode} from "../helper interface/token-mode";
import {RequestContentType} from "../helper interface/request-content-type";
import {ResponseContentType} from "../helper interface/response-content-type";
import {ObjectToQueryStringHelper} from "../../../helper/object-to-query-string-helper";

@Injectable({
  providedIn: 'root'
})
export class ConfigHelperService {

  constructor(private objectToQueryStringHelper: ObjectToQueryStringHelper) {
  }




  getUrl(restExtra: RestExtra) {
    console.log('restExtra', restExtra)
    if (restExtra.serverUrlConfig == null && restExtra.serverUrlConfig == undefined) {
      restExtra.serverUrlConfig = MAIN_SERVER_URL;
    }
    return restExtra.serverUrlConfig + restExtra.suffixPath + this.objectToQueryStringHelper.main(restExtra.urlQueryObject);
  }

  getHttpHeaders(httpHeaders: HttpHeaders, restExtra: RestExtra) {
    let token;
    if (restExtra.needToken && restExtra.tokenMode !== TokenMode.URL) {
      if (restExtra.tokenKey) {
        token = localStorage.getItem(restExtra.tokenKey)
      } else {
        token = localStorage.getItem('token')
      }
      httpHeaders = httpHeaders.append('Authorization', 'Bearer' + token);
    }
    if(JSON.stringify(restExtra.otherHeaders)!= '{}' &&
      restExtra.otherHeaders !== null &&  restExtra.otherHeaders !== undefined){
      for (const [key, value] of Object.entries(restExtra.otherHeaders)) {
        httpHeaders = httpHeaders.append(key,  value);
      }
    }
    httpHeaders = this.setRequestContentType(httpHeaders, restExtra.requestContentType);
    return httpHeaders;
  }

  setRequestContentType(httpHeaders: HttpHeaders, requestContentType: RequestContentType | any) {
    switch (requestContentType) {
      case RequestContentType.JSON:
        return httpHeaders.append('Content-Type', 'application/json');
      case RequestContentType.FORM:
        return httpHeaders;
      case RequestContentType.FORM_DATA:
        return httpHeaders;
      case RequestContentType.TEXT:
        return httpHeaders.append('Content-Type', 'text/xml');
      case RequestContentType.BLOB:
        return httpHeaders;
      default:
        return httpHeaders
    }
  }

  getResponseContentType(responseContentType: ResponseContentType | any): any {
    switch (responseContentType) {
      case ResponseContentType.Json:
        return 'json';
      case ResponseContentType.Blob:
        return 'blob';
      case ResponseContentType.Text:
        return 'text';
      default:
        return 'json';
    }
  }


}


