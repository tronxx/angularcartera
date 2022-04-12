import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltacliComponent } from './altacli.component';

describe('AltacliComponent', () => {
  let component: AltacliComponent;
  let fixture: ComponentFixture<AltacliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltacliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltacliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
