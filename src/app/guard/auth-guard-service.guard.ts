import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.isAuthenticated()){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token){
      return true;
    }
    else { return false; }
  }
}
