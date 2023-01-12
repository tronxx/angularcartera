import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaprelcobComponent } from './caprelcob.component';

describe('CaprelcobComponent', () => {
  let component: CaprelcobComponent;
  let fixture: ComponentFixture<CaprelcobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaprelcobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaprelcobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
