import { Component, inject } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  templateUrl: 'conformation.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ConformationPage {
  
  router = inject(Router);

  isSuccess: boolean = false;
  accessKey: string = '';
  location: string = '';
  date: Date = new Date();
  time: string = '';

  constructor() {
    const state = this.router.getCurrentNavigation()?.extras.state as any;
    this.isSuccess = state?.['success'] || false;
    this.accessKey = state?.['accessKey'] || '';
    this.location = state?.['location'] || '';
    this.date = state?.['date'] || new Date();
    this.time = state?.['time'] || '';
  }
}