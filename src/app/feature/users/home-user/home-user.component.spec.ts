import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUserComponent } from './home-user.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomeUserComponent', () => {
  let component: HomeUserComponent;
  let fixture: ComponentFixture<HomeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUserComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
