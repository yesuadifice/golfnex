import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // ✅ Important
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-smartaccess',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule], // ✅ Must include IonicModule
  templateUrl: './smartaccess.page.html',
  styleUrls: ['./smartaccess.page.scss'],
})


export class SmartAccessPage {
  tickets: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const storedTickets = localStorage.getItem('tickets');
    if (storedTickets) {
      this.tickets = JSON.parse(storedTickets);
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
