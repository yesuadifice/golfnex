import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BayPage } from './bay.page';

describe('BayPage', () => {
  let component: BayPage;
  let fixture: ComponentFixture<BayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
