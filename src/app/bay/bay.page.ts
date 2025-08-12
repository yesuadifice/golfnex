import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

interface Bay {
  id: string;
  name: string;
  status: 'available' | 'occupied';
}

@Component({
  selector: 'app-bay',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './bay.page.html',
  styleUrls: ['./bay.page.scss']
})
export class BayPage implements OnInit {
  courtId: string | null = null;
  timingId: string | null = null;
  locationName = '';
  selectedDate = '';
  selectedPrice = 0;

  // Extras prices
  loungePrice: number = 20;   // Example price for Private Lounge
  beveragePrice: number = 10; // Example price for Beverage

  bays: Bay[] = [
    { id: 'bayA', name: 'Bay A', status: 'available' },
    { id: 'bayB', name: 'Bay B', status: 'available' },
    { id: 'bayC', name: 'Bay C', status: 'occupied' },
    { id: 'bayD', name: 'Bay D', status: 'available' },
    { id: 'bayE', name: 'Bay E', status: 'occupied' },
    { id: 'bayF', name: 'Bay F', status: 'available' }
  ];

  selectedBayId: string | null = null;
  selectedBay: Bay | null = null;

  wantsLounge: boolean = false;
  wantsBeverage: boolean = false;
  showExtrasPrompt: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courtId = params.get('courtId');
      const encodedTiming = params.get('timingId');
      this.timingId = encodedTiming ? decodeURIComponent(encodedTiming) : null;
    });

    this.route.queryParamMap.subscribe(qparams => {
      this.locationName = qparams.get('location') || '';
      this.selectedDate = qparams.get('date') || '';
      this.selectedPrice = Number(qparams.get('price')) || 0;
    });
  }

  selectBay(bayId: string): void {
    const bay = this.bays.find(b => b.id === bayId);
    if (bay && bay.status === 'available') {
      this.selectedBayId = bayId;
      this.selectedBay = bay;
      this.showExtrasPrompt = true;
      this.wantsLounge = false;
      this.wantsBeverage = false;
    }
  }

  getBayButtonClasses(bay: Bay): string {
    if (bay.status === 'occupied') {
      return 'bg-red-600 opacity-50 cursor-not-allowed text-white';
    }
    if (this.selectedBayId === bay.id) {
      return 'bg-yellow-400 ring-4 ring-yellow-500';
    }
    return 'bg-green-600 hover:bg-green-700 text-white';
  }

  get totalPrice(): number {
    let total = this.selectedPrice;
    if (this.wantsLounge) total += this.loungePrice;
    if (this.wantsBeverage) total += this.beveragePrice;
    return total;
  }

 proceedToPayment(): void {
  if (!this.courtId || !this.timingId || !this.selectedBayId || !this.selectedBay) {
    console.warn('Missing data to proceed to payment');
    return;
  }

  this.router.navigate(['/payment', this.courtId, encodeURIComponent(this.timingId), this.selectedBayId], {
    queryParams: {
      location: this.locationName,
      date: this.selectedDate,
      bayName: this.selectedBay.name,          // Pass bay name explicitly
      wantsLounge: this.wantsLounge,
      wantsBeverage: this.wantsBeverage,
      totalPrice: this.totalPrice
    }
  }).catch(err => console.error('Navigation error:', err));
}

}
