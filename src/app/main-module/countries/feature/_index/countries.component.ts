import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Country} from "../../../../core-module/auth/model/country";
import {fromEvent, Observable} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {debounceTime, map, tap} from 'rxjs/operators';
import {CountriesService} from "../../service/countries.service";
import {untilDestroyed} from "../../../../shared/service/take-until-destroy";
import {PatternConstants} from "../../../../shared/constants/pattern.constants";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit, AfterViewInit, OnDestroy {
  countries: Country[] = [];
  countryCtrl = new FormControl(null, [Validators.pattern(PatternConstants.enText)])
  debounceTime: number = 1000;
  valid: any;

  constructor(private countriesService: CountriesService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getCountries();
  }


  /**
   * With each keyup if input value valid, the service is called after 1 seconds
   */
  getCountries() {
    const input = document.getElementById('cInput');
    const example = fromEvent(<any>input, 'keyup').pipe(map((i: any) => i.currentTarget['value']));
    const debouncedInput = example.pipe(debounceTime(this.debounceTime));
    debouncedInput.pipe(untilDestroyed(this)).subscribe(val => {
      if (val && this.valid === null) {
        this.countriesService.getCountriesByFullNameFilter({name: val}, {fullText: false}).subscribe((res: Country[]) => {
          if (res) {
            this.countries = res;
          }else {
            this.countries = []
          }
        });
      } else {
        this.countries = []
      }
    });
  }

  ngOnDestroy() {
  }
}
