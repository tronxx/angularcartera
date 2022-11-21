import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolenganComponent } from './polengan.component';

describe('PolenganComponent', () => {
  let component: PolenganComponent;
  let fixture: ComponentFixture<PolenganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolenganComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolenganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
