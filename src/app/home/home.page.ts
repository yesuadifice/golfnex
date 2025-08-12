import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  promotions = [
    { image: 'assets/images/BNR-01.png', title: 'Summer Special - 20% Off' },
    { image: 'assets/promo2.jpg', title: 'Weekday Discounts' },
    { image: 'assets/promo3.jpg', title: 'Group Booking Offers' }
  ];

  locations = ['Downtown Golf Club', 'Westside Greens', 'Pine Valley Resort'];
  selectedLocation: string = '';
  selectedDate: Date = new Date();
  selectedTime: string = '';
  pricePerHour: number = 45; // updated price
  showTimePicker: boolean = false;
  showDatePicker: boolean = false;
  timeSlots: { display: string, value: string, price: number }[] = [];
  minDate: string = new Date().toISOString();

  bookingSummary: any = null;

  constructor(private router: Router) {
    this.generateTimeSlots();
  }

  ngOnInit() {
    this.initSwiper();
  }

  private initSwiper() {
    const swiperEl = document.querySelector('swiper-container');
    if (swiperEl) {
      Object.assign(swiperEl, {
        slidesPerView: 1,
        spaceBetween: 16,
        loop: true,
        pagination: { clickable: true }
      });
      swiperEl.initialize();
    }
  }

  private generateTimeSlots() {
    const now = new Date();
    const isToday = this.isSameDate(now, this.selectedDate);
    this.timeSlots = [];

    let startHour = 0;
    let startMinute = 0;

    if (isToday) {
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      startMinute = currentMinute >= 30 ? 0 : 30;
      startHour = currentMinute >= 30 ? currentHour + 1 : currentHour;

      if (startHour >= 24) return;
    }

    for (let hour = startHour; hour < 24; hour++) {
      const minuteOptions = hour === startHour
        ? startMinute === 0 ? [0, 30] : [30]
        : [0, 30];

      for (const minute of minuteOptions) {
        if (hour === 23 && minute > 0) continue;

        const period = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;

        this.timeSlots.push({
          display: `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`,
          value: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
          price: this.pricePerHour
        });
      }
    }
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
    if (this.showDatePicker) this.showTimePicker = false;
  }

  toggleTimePicker() {
    this.showTimePicker = !this.showTimePicker;
    if (this.showTimePicker) this.showDatePicker = false;
  }

  selectDate(event: any) {
    this.selectedDate = new Date(event.detail.value);
    this.generateTimeSlots();
    this.showDatePicker = false;
    this.selectedTime = '';
    this.bookingSummary = null;
  }

  selectTime(time: string) {
    this.selectedTime = time;
    const [hours, minutes] = time.split(':').map(Number);

    const start = new Date(this.selectedDate);
    start.setHours(hours, minutes);

    const end = new Date(start);
    end.setHours(start.getHours() + 1);

    this.bookingSummary = {
      location: this.selectedLocation,
      date: this.getFormattedDate(),
      startTime: this.formatTime(start),
      endTime: this.formatTime(end),
      price: this.pricePerHour
    };

    this.showTimePicker = false;
  }

  private formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  getTimeDisplay(): string {
    if (!this.selectedTime) return 'Select Time';
    const [hours, minutes] = this.selectedTime.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  getFormattedDate(): string {
    return this.selectedDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  isFormValid(): boolean {
    return !!this.selectedLocation && !!this.selectedDate && !!this.selectedTime;
  }

  proceedToPayment() {
    if (this.isFormValid()) {
      this.router.navigate(['/payment'], {
        state: { ...this.bookingSummary }
      });
    }
  }
}
