import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarenpolComponent } from './agregarenpol.component';

describe('AgregarenpolComponent', () => {
  let component: AgregarenpolComponent;
  let fixture: ComponentFixture<AgregarenpolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarenpolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarenpolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
