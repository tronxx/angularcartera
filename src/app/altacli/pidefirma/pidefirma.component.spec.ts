import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PidefirmaComponent } from './pidefirma.component';

describe('PidefirmaComponent', () => {
  let component: PidefirmaComponent;
  let fixture: ComponentFixture<PidefirmaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PidefirmaComponent]
    });
    fixture = TestBed.createComponent(PidefirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
