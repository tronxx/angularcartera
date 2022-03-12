import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacliComponent } from './facturacli.component';

describe('FacturacliComponent', () => {
  let component: FacturacliComponent;
  let fixture: ComponentFixture<FacturacliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturacliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturacliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
