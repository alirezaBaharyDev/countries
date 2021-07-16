import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PanelComponent} from "./_index/panel.component";
import {AuthGuard} from "../../../shared/guard/auth-guard.service";

const routes: Routes = [
  {
    path:'' , component: PanelComponent , children:
      [
        {
          path: 'countries',
          loadChildren: () => import('../../../main-module/countries/feature/countries.module').then(m => m.CountriesModule) ,
          canActivate: [AuthGuard]
        },
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule { }
