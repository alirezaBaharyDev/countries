import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./core-module/error-pages/not-found/not-found.component";
import {AppComponent} from "./app.component";
import {AuthGuard} from "./shared/guard/auth-guard.service";

const routes: Routes = [
  {path:'' , redirectTo: '/panel', pathMatch: 'full'},
  {path: 'auth', loadChildren: () => import('./core-module/auth/feature/auth.module').then(m => m.AuthModule)},
  {path: 'panel', loadChildren: () => import('./core-module/panel/feature/panel.module').then(m => m.PanelModule) ,canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent},
];

export const routingConfiguration: ExtraOptions = {
  useHash: true,
  paramsInheritanceStrategy: 'always'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
