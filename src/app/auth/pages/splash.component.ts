import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { firebaseAuth } from 'src/app/core/firebase-init';
import { onAuthStateChanged, User, Unsubscribe } from 'firebase/auth';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit, OnDestroy {
  isLoading = true;
  authStateUnsubscribe: Unsubscribe | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkAuthState();
  }

  ngOnDestroy() {
    if (this.authStateUnsubscribe) {
      this.authStateUnsubscribe();
    }
  }

  private checkAuthState(): void {
    this.authStateUnsubscribe = onAuthStateChanged(
      firebaseAuth,
      (user: User | null) => {
        this.isLoading = false;
        if (user) {
          // ✅ User is logged in - redirect to home after short delay
          this.navigateWithDelay('/home', 1000);
        } else {
          // ❌ Not logged in - redirect to login after short delay
          this.navigateWithDelay('/login', 1500);
        }
      },
      (error) => {
        console.error('Auth state error:', error);
        this.isLoading = false;
        // Error - go to login
        this.navigateWithDelay('/login', 1500);
      }
    );
  }

  private navigateWithDelay(route: string, delayMs: number): void {
    setTimeout(() => {
      this.router.navigate([route]).catch(err => {
        console.error(`Navigation to ${route} failed:`, err);
        this.router.navigate(['/login']);
      });
    }, delayMs);
  }

  goToLogin(): void {
    // Button click → go to login immediately
    this.isLoading = true;
    this.router.navigate(['/login']).catch(err => {
      console.error('Login navigation failed:', err);
      this.isLoading = false;
    });
  }
}
