import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TomafotosComponent } from './tomafotos.component';

describe('TomafotosComponent', () => {
  let component: TomafotosComponent;
  let fixture: ComponentFixture<TomafotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TomafotosComponent]
    });
    fixture = TestBed.createComponent(TomafotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
