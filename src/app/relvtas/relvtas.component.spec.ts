import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelvtasComponent } from './relvtas.component';

describe('RelvtasComponent', () => {
  let component: RelvtasComponent;
  let fixture: ComponentFixture<RelvtasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelvtasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelvtasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
