import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timings',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './timings.page.html',
  styleUrls: ['./timings.page.scss']
})
export class TimingsPage implements OnInit {
  courtId: string | null = null;
  locationName = '';
  selectedDate = '';
  selectedTime = '';
  selectedPrice = 0;
  showCalendar = false;

  minDate: string;
  maxDate: string;

  timeSlotsByDate: { [date: string]: { time: string; price: number }[] } = {};

  locationNames: { [key: string]: string } = {
    court1: 'Green Valley Golf Club',
    court2: 'Sunset Hills Golf Course',
    court3: 'Pine Ridge Golf Links'
  };

  constructor(private route: ActivatedRoute, private router: Router) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    const max = new Date();
    max.setMonth(max.getMonth() + 3);
    this.maxDate = max.toISOString().split('T')[0];

    this.setDefaultSlotsForDate(this.minDate);
  }

  ngOnInit(): void {
    this.courtId = this.route.snapshot.paramMap.get('courtId');
    if (this.courtId) {
      this.locationName = this.locationNames[this.courtId] ?? 'Unknown Location';
    }
    this.selectedDate = this.minDate;
    this.selectedTime = '';
  }

  get availableTimes(): { time: string; price: number }[] {
    return this.timeSlotsByDate[this.selectedDate] ?? [];
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
  }

  onDateChange(event: any): void {
    const selectedValue = event.detail.value;
    this.selectedDate = selectedValue;
    this.showCalendar = false;

    if (!this.timeSlotsByDate[this.selectedDate]) {
      this.setDefaultSlotsForDate(this.selectedDate);
    }

    this.selectedTime = '';
    this.selectedPrice = 0;
  }

  setDefaultSlotsForDate(date: string): void {
    const slots: { time: string; price: number }[] = [];

    for (let hour = 12; hour <= 23; hour++) {
      const displayHour = hour === 12 ? 12 : hour % 12;
      const suffix = hour < 12 || hour === 24 ? 'AM' : 'PM';
      const timeLabel = `${displayHour}:00 ${suffix}`;
      const price = 10 + (hour - 12) * 2;

      slots.push({ time: timeLabel, price });
    }

    slots.push({ time: '12:00 AM', price: 36 }); // Midnight slot

    this.timeSlotsByDate[date] = slots;
  }

  selectTime(slot: { time: string; price: number }): void {
    this.selectedTime = slot.time;
    this.selectedPrice = slot.price;
  }

  proceedToGuestInfo(): void {
    if (!this.courtId || !this.selectedTime) {
      console.warn('Missing courtId or selectedTime:', this.courtId, this.selectedTime);
      return;
    }

    const encodedTime = encodeURIComponent(this.selectedTime);

    this.router.navigate(['/guest-info', this.courtId, encodedTime], {
      queryParams: {
        location: this.locationName,
        date: this.selectedDate,
        price: this.selectedPrice
      }
    }).catch(err => console.error('Navigation error:', err));
  }
}