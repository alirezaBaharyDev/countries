import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './_index/panel.component';
import {HeaderComponent} from "./header/header.component";


@NgModule({
  declarations: [
    PanelComponent,
    HeaderComponent
  ],
    imports: [
        CommonModule,
        PanelRoutingModule,
    ]
})
export class PanelModule { }
