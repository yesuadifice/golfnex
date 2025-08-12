import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ServiceAuthService } from 'src/app/auth/services/service-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, // ✅ includes NgIf
    IonicModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginPage implements OnInit {
  user = signal<any>(null);           // WritableSignal for reactive user state
  loading = signal(false);            // WritableSignal for loading status
  errorMessage = signal('');          // WritableSignal for error messages

  images: string[] = [
    'assets/images/golf1.jpg',
    'assets/images/golf2.jpg',
    'assets/images/golf3.jpg'
  ];
  currentImageIndex = 0;

  constructor(
    private authService: ServiceAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.startSlider();
  }

  startSlider(): void {
    setInterval(() => {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.images.length;
    }, 3000);
  }

  async loginWithGoogle(): Promise<void> {
    this.loading.set(true);
    this.errorMessage.set('');

    try {
      const user = await this.authService.googleAuth();
      if (user) {
        console.log('✅ Login successful:', user);
        this.user.set(user);

        localStorage.setItem('profilePhoto', user.photoURL || '');

        this.router.navigate(['/home']);
      } else {
        this.errorMessage.set('Unable to log in. Please try again.');
      }
    } catch (error) {
      console.error('❌ Google login failed:', error);
      this.errorMessage.set(
        'Google login failed. Check your connection and try again.'
      );
    } finally {
      this.loading.set(false);
    }
  }
}