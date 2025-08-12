import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmartaccessPage } from './smartaccess.page';

describe('SmartaccessPage', () => {
  let component: SmartaccessPage;
  let fixture: ComponentFixture<SmartaccessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartaccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
