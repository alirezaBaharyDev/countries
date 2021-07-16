import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ObjectToQueryStringHelper {
  constructor() {
  }

  main(object: Object): string {
    const finalResult: string[] = [];
    this.convert(finalResult, object);
    return '?' + finalResult.filter(item => (item !== '')).join('&');
  }

  convert(finalResult: string[], object: Object): string {
    if (object === null || object === undefined) {
      return '';
    }
    const props: Array<PairKeyValue> = new Array();
    Object.keys(object).forEach(key => {
        // @ts-ignore
        if (object[key] !== null && object[key] !== undefined) {
          // @ts-ignore
          if (object[key].toString() === '[object Object]') {
            // @ts-ignore
            this.object2QueryString(finalResult, object[key]);
          } else {
            // @ts-ignore
            props.push(new PairKeyValue(key, object[key]));
          }
        }
      }
    );
    const result = [];
    for (let i = 0; i < props.length; i++) {
      result.push([props[i].key, props[i].value]);
    }
    let r = result.map(param => param.join('=')).join('&');
    finalResult.push(r);
    return r;
  }
}


export class PairKeyValue {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }

  public static getValue(key: string, pairKeyValueList: PairKeyValue[]): any {
    if (pairKeyValueList) {
      for (let pair of pairKeyValueList) {
        if (pair.key === key) {
          return pair.value;
        }
      }
    }
  }
}
