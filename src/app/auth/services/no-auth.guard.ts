import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { firebaseAuth } from 'src/app/core/firebase-init';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    const auth = getAuth(firebaseAuth.app);
    const user = auth.currentUser;

    // If user is logged in, redirect to home
    if (user || localStorage.getItem('auth_token')) {
      this.router.navigate(['/home']);
      return false;
    }

    // If not logged in, allow access
    return true;
  }

  // Optional: helper logout
  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }
}
