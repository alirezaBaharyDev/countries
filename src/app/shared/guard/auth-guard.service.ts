import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../core-module/auth/service/auth.service";

@Injectable(
  {providedIn: 'root'}
)
export class AuthGuard implements CanActivate {
  logged: boolean = false ;
  constructor(private authService: AuthService) {
    this.authService.loginCheck(true).subscribe(res=>{
      this.logged = res ;
    })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.logged) {
      return true;
    }
    return false;
  }
}
