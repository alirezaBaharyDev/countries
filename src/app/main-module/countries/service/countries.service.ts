import {Injectable} from '@angular/core';
import {ServiceBaseService} from "../../../shared/service/service-base/service-base.service";
import {HttpClient} from "@angular/common/http";
import {ConfigHelperService} from "../../../shared/service/service-base/config/config-helper.service";

@Injectable({
  providedIn: 'root'
})
export class CountriesService extends ServiceBaseService {
  constructor(public configHelperService: ConfigHelperService ,public httpClient: HttpClient) {
    super(configHelperService, httpClient);
    this.prefix = 'rest/v2'
  }


  getCountriesByFullNameFilter(objectSuffix:{name:string} , query: {fullText: boolean })  {
    const suffixPath = this.prefix +`/name/${objectSuffix.name}`;
    return super.getService({
      suffixPath : suffixPath,
      urlQueryObject: query ,
      needToken: false
    })
  }

}
