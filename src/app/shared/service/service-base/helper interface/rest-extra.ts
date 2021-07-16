import {ResponseContentType} from "./response-content-type";
import {RequestContentType} from "./request-content-type";
import {TokenMode} from "./token-mode";

export interface RestExtra {
  serverUrlConfig?: string
  suffixPath?: string;
  tokenKey?: string;
  responseContentType?: ResponseContentType;
  requestContentType?: RequestContentType;
  urlQueryObject?: Object| any;
  otherHeaders?: Object;
  needToken?: boolean;
  tokenMode?: TokenMode ;
}

