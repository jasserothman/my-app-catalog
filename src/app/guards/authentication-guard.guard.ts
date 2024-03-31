import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

export const authenticationGuardGuard: CanActivateFn = (route, state) => {
  return inject(AuthenticationService).isAuthenticated()
  ? true
    : inject(Router).navigateByUrl("/login")
};



///////////////////equivalent en angular 13////////////////////

// import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
// import {AuthenticationService} from "../services/authentication.service";
// import {Injectable} from "@angular/core";
// @Injectable({
//   providedIn:'root'
// })
// export class AuthenticationGuard implements CanActivateFn {
//
//   constructor(private authService: AuthenticationService,private router:Router) {
//   }
//   CanActivateFn = (route :ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//     if (this.authService.isAuthenticated()==true){return true;}
//     else {
//       this.router.navigateByUrl("/login");
//       return false;
//     }
//
//   }
// }
