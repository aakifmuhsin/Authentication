import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private service:AuthService,private route:Router){

  }
  canActivate(): boolean {
    if (this.service.IsLoggedIn()) {
      // User is already logged in, redirect to home page
      this.route.navigate(['/home']);
      return false;
    }
    return true;
  }
  
}
