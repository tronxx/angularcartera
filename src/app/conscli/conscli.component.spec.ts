import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConscliComponent } from './conscli.component';

describe('ConscliComponent', () => {
  let component: ConscliComponent;
  let fixture: ComponentFixture<ConscliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConscliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConscliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
