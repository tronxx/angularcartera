import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PidepasswdComponent } from './pidepasswd.component';

describe('PidepasswdComponent', () => {
  let component: PidepasswdComponent;
  let fixture: ComponentFixture<PidepasswdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PidepasswdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PidepasswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
