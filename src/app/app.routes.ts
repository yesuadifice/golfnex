import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { NoAuthGuard } from './auth/services/no-auth.guard';

export const routes: Routes = [
  // 🌊 Public routes (no auth required)
  {
    path: 'splash',
    canActivate: [NoAuthGuard],
    loadComponent: () =>
      import('./auth/pages/splash.component').then(m => m.SplashComponent),
    data: { animation: 'fadeIn' }
  },
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    loadComponent: () =>
      import('./auth/pages/login.component').then(m => m.LoginPage),
    data: { animation: 'slideUp' }
  },

  // 🔐 Protected routes (require auth)
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage),
        data: { title: 'Dashboard' }
      },
      {
        path: 'smart-access',
        loadComponent: () =>
          import('./smartAcess/smartaccess/smartaccess.page').then(m => m.SmartAccessPage)
      },
      {
        path: 'tournaments',
        loadComponent: () =>
          import('./tournments/tournments/tournments.page').then(m => m.TournmentsPage)
      },
      {
        path: 'membership',
        loadComponent: () =>
          import('./membership/membership/membership.page').then(m => m.MembershipPage),
        data: { requiresMembership: true }
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./auth/pages/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'payment',
        loadComponent: () =>
          import('./payment/payment/payment.page').then(m => m.PaymentPage),
        data: { sensitive: true }
      },
      {
        path: 'date-modal',
        loadComponent: () =>
          import('./date-modal/date-modal/date-modal.page').then(m => m.DateModalPage),
        outlet: 'modal'
      }
    ]
  },

  // ❌ Fallback route
  {
    path: '**',
    redirectTo: 'splash'
  }
];
