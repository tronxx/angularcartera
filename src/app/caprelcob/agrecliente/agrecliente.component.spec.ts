import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreclienteComponent } from './agrecliente.component';

describe('AgreclienteComponent', () => {
  let component: AgreclienteComponent;
  let fixture: ComponentFixture<AgreclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgreclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
