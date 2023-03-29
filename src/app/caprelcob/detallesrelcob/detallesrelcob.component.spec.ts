import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesrelcobComponent } from './detallesrelcob.component';

describe('DetallesrelcobComponent', () => {
  let component: DetallesrelcobComponent;
  let fixture: ComponentFixture<DetallesrelcobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesrelcobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesrelcobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
