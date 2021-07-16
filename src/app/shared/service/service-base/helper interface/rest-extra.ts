import {ResponseContentType} from "./response-content-type";
import {RequestContentType} from "./request-content-type";
import {TokenMode} from "./token-mode";
import {MAIN_SERVER_URL} from "../server-url-config";

export class RestExtra {
  serverUrlConfig?: string
  url?: string;
  tokenKey?: string;
  responseContentType?: ResponseContentType;
  requestContentType?: RequestContentType;
  urlQueryObject?: Object;
  otherHeaders?: Object;
  needToken?: boolean;
  tokenMode?: TokenMode ;
  customErrorHandler?: boolean ;
}

