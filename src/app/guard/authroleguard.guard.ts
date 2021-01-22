import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthroleguardGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.isAuthenticated() && !this.isAdmin()){
      alert('You should be an Administrator');
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
  public isAdmin(): boolean {
    const role = localStorage.getItem('role');
    if (role === 'ROLE_ADMIN'){
      return true;
    }
    else { return false; }
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token){
      return true;
    }
    else { return false; }
  }
}
