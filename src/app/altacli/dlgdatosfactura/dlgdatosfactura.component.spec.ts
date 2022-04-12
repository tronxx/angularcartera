import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgdatosfacturaComponent } from './dlgdatosfactura.component';

describe('DlgdatosfacturaComponent', () => {
  let component: DlgdatosfacturaComponent;
  let fixture: ComponentFixture<DlgdatosfacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgdatosfacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgdatosfacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
