import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConformationPage } from './conformation.page';

describe('ConformationPage', () => {
  let component: ConformationPage;
  let fixture: ComponentFixture<ConformationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
