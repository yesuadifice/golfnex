import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateModalPage } from './date-modal.page';

describe('DateModalPage', () => {
  let component: DateModalPage;
  let fixture: ComponentFixture<DateModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DateModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
