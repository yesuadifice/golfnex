import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestInfoPage } from './guest-info.page';

describe('GuestInfoPage', () => {
  let component: GuestInfoPage;
  let fixture: ComponentFixture<GuestInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
