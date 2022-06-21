import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapvtasComponent } from './capvtas.component';

describe('CapvtasComponent', () => {
  let component: CapvtasComponent;
  let fixture: ComponentFixture<CapvtasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapvtasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapvtasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
