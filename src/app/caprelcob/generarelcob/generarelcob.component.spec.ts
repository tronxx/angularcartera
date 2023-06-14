import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarelcobComponent } from './generarelcob.component';

describe('GenerarelcobComponent', () => {
  let component: GenerarelcobComponent;
  let fixture: ComponentFixture<GenerarelcobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerarelcobComponent]
    });
    fixture = TestBed.createComponent(GenerarelcobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
