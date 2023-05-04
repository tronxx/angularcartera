
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  constructor(private router: Router) { }   

  fechahoy_z  = new Date();
  
  anu_z = this.fechahoy_z.getFullYear().toString();
  mes_z = ((this.fechahoy_z.getMonth()+101).toString()).substring(1,3);
  dia_z = ((this.fechahoy_z.getDate()+100).toString()).substring(1,3);
  strfecha_z = this.anu_z + "-" + this.mes_z + "-" + this.dia_z;
    

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLoggedIn()) {      
        return true;      
    }      
    // navigate to login page as user is not authenticated      
    this.router.navigate(['/login']);      
    return false;      
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

     
  public isLoggedIn(): boolean {      
    let status = false;
    var mitoken_z = localStorage.getItem('token') || "{}";
    var nvotoken_z = JSON.parse(mitoken_z);
    var nvokey_z = Md5.hashStr(nvotoken_z.login + ":" + this.strfecha_z).toString();
    if (nvokey_z == nvotoken_z.token) { 
      status = true;      
    } else {      
      status = false;      
    }      
    return status;      
  }    
}
