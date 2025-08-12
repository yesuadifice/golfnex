import { Component, inject } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-modal',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Select Date</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="dismiss()">Close</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-datetime
        [min]="minDate"
        (ionChange)="selectDate($event)"
      ></ion-datetime>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class DateModalPage {
  private modalCtrl = inject(ModalController);

  minDate: string = new Date().toISOString();

  selectDate(event: any) {
    this.modalCtrl.dismiss(event.detail.value);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}