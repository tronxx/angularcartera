import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallescliComponent } from './detallescli.component';

describe('DetallescliComponent', () => {
  let component: DetallescliComponent;
  let fixture: ComponentFixture<DetallescliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallescliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallescliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
