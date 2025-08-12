import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  getCourtById(id: string): Observable<{ name: string } | null> {
  const courts: { [key: string]: { name: string } } = {
    'court1': { name: 'Green Valley Golf Club' },
    'court2': { name: 'Sunset Hills Golf Course' },
    'court3': { name: 'Pine Ridge Golf Links' }
  };
  return of(courts[id] ?? null);
}

  getTimingById(id: string): Observable<{ startTime: number } | null> {
    const timings: { [key: string]: { startTime: number } } = {
      'timing1': { startTime: 1691229600000 }, // 10:00 AM
      'timing2': { startTime: 1691233200000 }, // 11:00 AM
      'timing3': { startTime: 1691236800000 }  // 12:00 PM
    };
    return of(timings[id] ?? null);
  }
}