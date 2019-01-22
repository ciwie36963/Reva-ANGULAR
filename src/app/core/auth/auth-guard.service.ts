import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //Not logged in
   
    if (!this.authService.user$.getValue()) {
      // Retain the attempted URL for redirection
      this.authService.redirectUrl = state.url;
      this.router.navigate(['/login']);
      return false;
    }
    //Not having the required role
    let user = this.authService.user$.getValue();
    
   
      let roles = route.data.roles;
      if(roles.length > 0 && !roles.includes(user.role)) {
        this.authService.redirectUrl = state.url;
        this.router.navigate(['/404']);
        return false;
      } 
      return true;
  }

}