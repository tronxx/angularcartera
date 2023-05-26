import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcumpolComponent } from './acumpol.component';

describe('AcumpolComponent', () => {
  let component: AcumpolComponent;
  let fixture: ComponentFixture<AcumpolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcumpolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcumpolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
