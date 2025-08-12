import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TournmentsPage } from './tournments.page';

describe('TournmentsPage', () => {
  let component: TournmentsPage;
  let fixture: ComponentFixture<TournmentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TournmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
