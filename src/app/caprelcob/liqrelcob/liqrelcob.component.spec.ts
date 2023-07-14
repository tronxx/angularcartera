import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiqrelcobComponent } from './liqrelcob.component';

describe('LiqrelcobComponent', () => {
  let component: LiqrelcobComponent;
  let fixture: ComponentFixture<LiqrelcobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiqrelcobComponent]
    });
    fixture = TestBed.createComponent(LiqrelcobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
