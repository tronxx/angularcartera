import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsupolComponent } from './consupol.component';

describe('ConsupolComponent', () => {
  let component: ConsupolComponent;
  let fixture: ComponentFixture<ConsupolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsupolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsupolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
