import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgDatosSolicComponent } from './dlg-datos-solic.component';

describe('DlgDatosSolicComponent', () => {
  let component: DlgDatosSolicComponent;
  let fixture: ComponentFixture<DlgDatosSolicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgDatosSolicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgDatosSolicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
