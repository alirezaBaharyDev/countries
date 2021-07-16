import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent } from './_index/countries.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MyMaterialModule} from "../../../shared/matrial/my-material-module";


@NgModule({
  declarations: [
    CountriesComponent
  ],
  imports: [
    CommonModule,
    MyMaterialModule,
    CountriesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CountriesModule { }
