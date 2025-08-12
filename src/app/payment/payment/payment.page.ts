import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PaymentState {
  location?: string;
  date?: Date;
  time?: string;
  price?: number;
}

@Component({
  selector: 'app-payment',
  templateUrl: 'payment.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PaymentPage implements OnInit {
  private router = inject(Router);
  stripe: any;
  elements: any;
  cardElement: any;

  location: string = '';
  date: Date = new Date();
  time: string = '';
  price: number = 0;
  paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: 'card' },
    { id: 'paypal', name: 'PayPal', icon: 'logo-paypal' },
  ];
  selectedMethod: string = 'card';

  async ngOnInit() {
    const state = this.router.getCurrentNavigation()?.extras.state as PaymentState;
    this.location = state?.location ?? '';
    this.date = state?.date ?? new Date();
    this.time = state?.time ?? '';
    this.price = state?.price ?? 0;

    // Initialize Stripe
    this.stripe = await loadStripe('your_publishable_key_here');
    this.elements = this.stripe.elements();
    this.cardElement = this.elements.create('card');
    this.cardElement.mount('#card-element');
  }

  async submitPayment() {
    if (this.selectedMethod === 'card') {
      try {
        const { error, paymentMethod } = await this.stripe.createPaymentMethod({
          type: 'card',
          card: this.cardElement,
        });

        if (error) {
          console.error(error);
          this.router.navigate(['/confirmation'], { state: { success: false } });
        } else {
          // Send paymentMethod.id to your backend
          const response = await fetch('your_backend_charge_endpoint', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              paymentMethodId: paymentMethod.id,
              amount: this.price * 100, // amount in cents
            }),
          });

          const result = await response.json();
          if (result.success) {
            this.router.navigate(['/confirmation'], { 
              state: { success: true, accessKey: 'BAY-1234' } 
            });
          } else {
            this.router.navigate(['/confirmation'], { state: { success: false } });
          }
        }
      } catch (error) {
        console.error('Payment error:', error);
        this.router.navigate(['/confirmation'], { state: { success: false } });
      }
    }
  }
}