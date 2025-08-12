import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { firebaseAuth } from 'src/app/core/firebase-init';
import { onAuthStateChanged } from 'firebase/auth';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  
  try {
    // Create a promise wrapper for Firebase auth state
    const user = await new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        firebaseAuth,
        (user) => {
          unsubscribe(); // Clean up listener immediately
          resolve(user);
        },
        (error) => {
          unsubscribe(); // Clean up on error
          reject(error);
        }
      );
    });

    if (user) {
      return true; // Allow access to protected route
    }

    // Redirect to login with navigation extras
    await router.navigate(['/login'], {
      queryParams: { 
        redirectTo: router.url // Preserve attempted URL for post-login redirect
      },
      replaceUrl: true // Prevent back navigation to guarded route
    });
    return false;

  } catch (error) {
    console.error('Auth guard error:', error);
    // Fallback redirect if navigation fails
    window.location.assign('/login');
    return false;
  }
};