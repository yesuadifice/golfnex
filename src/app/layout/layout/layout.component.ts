import { Component, inject, signal, NgZone, effect } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  private auth = inject(Auth);
  private ngZone = inject(NgZone);
  profilePhotoUrl = signal<string | null>(null);

  constructor() {
    // ✅ Safe injection context using Angular signals
    effect(() => {
      onAuthStateChanged(this.auth, user => {
        this.ngZone.run(() => {
          this.profilePhotoUrl.set(user?.photoURL ?? null);
        });
      });
    });
  }
}