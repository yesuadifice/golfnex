// src/app/guest-info/guest-info.page.ts

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BookingService } from './booking.service';

@Component({
  selector: 'app-guest-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule
  ],
  templateUrl: './guest-info.page.html',
  styleUrls: ['./guest-info.page.scss']
})
export class GuestInfoPage implements OnInit {
  guestForm!: FormGroup;
  courtId = '';
  selectedTime = '';
  courtName = '';
  maxGuests = 3;
  beerPrice = 5;
  loungePrice = 20;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.courtId = this.route.snapshot.paramMap.get('courtId')!;
    this.selectedTime = decodeURIComponent(this.route.snapshot.paramMap.get('timingId')!);
    this.fetchCourtName();

    this.guestForm = this.fb.group({
      guestCount: [1, [Validators.min(1), Validators.max(this.maxGuests)]],
      lounge: [false],
      beers: this.fb.array([new FormControl(0)])
    });

    this.guestForm.get('guestCount')!.valueChanges.subscribe(count => {
      const beersArray = this.beers;
      beersArray.clear();
      for (let i = 0; i < count; i++) {
        beersArray.push(new FormControl(0));
      }
    });
  }

  fetchCourtName() {
    this.bookingService.getCourtById(this.courtId).subscribe(court => {
      this.courtName = court?.name ?? 'Unknown Court';
    });
  }

  get beers(): FormArray {
    return this.guestForm.get('beers') as FormArray;
  }

  get beersControls(): FormControl[] {
    return this.beers.controls as FormControl[];
  }

  get totalBill(): number {
    const beerCost = this.beersControls.reduce((sum, ctrl) => sum + ctrl.value * this.beerPrice, 0);
    const loungeCost = this.guestForm.value.lounge ? this.loungePrice : 0;
    return beerCost + loungeCost;
  }

  proceedToPayment() {
    this.router.navigate(['/payment', this.courtId, encodeURIComponent(this.selectedTime)]);
  }
}