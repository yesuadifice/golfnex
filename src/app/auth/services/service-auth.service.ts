import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  UserCredential,
  User,
} from 'firebase/auth';

import { firebaseAuth } from 'src/app/core/firebase-init';

@Injectable({ providedIn: 'root' })
export class ServiceAuthService {
  private auth: Auth = firebaseAuth;
  private readonly backendUrl = environment.verifyTokenUrl;

  constructor(private http: HttpClient, private router: Router) {}

  // Sign in with Google
  async googleAuth(): Promise<User | null> {
    try {
      const provider = new GoogleAuthProvider();
      const result: UserCredential = await signInWithPopup(this.auth, provider);
      const user = result.user;

      if (user) {
        const token = await user.getIdToken();
        console.log('Firebase ID Token:', token);
        await this.verifyTokenWithBackend(token);
        return user;
      }

      return null;
    } catch (error) {
      console.error('Google sign-in failed:', error);
      return null;
    }
  }

  // Token verification
  async verifyTokenWithBackend(token: string): Promise<void> {
    try {
      const res = await this.http.post(this.backendUrl, { token }).toPromise();
      console.log('Token verified:', res);
    } catch (err) {
      console.error('Backend verification failed:', err);
    }
  }

  // Sign out
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      console.log('User signed out');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}