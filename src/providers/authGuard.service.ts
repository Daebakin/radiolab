import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): boolean {
    if (!this.authService.getToken()) {
      this.router.navigate(["/login"]);
    }
    return this.authService.getToken();
  }

}