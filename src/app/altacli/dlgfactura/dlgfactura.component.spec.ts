import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgfacturaComponent } from './dlgfactura.component';

describe('DlgfacturaComponent', () => {
  let component: DlgfacturaComponent;
  let fixture: ComponentFixture<DlgfacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgfacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgfacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
