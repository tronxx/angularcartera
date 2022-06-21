import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgDatosvtaComponent } from './dlg-datosvta.component';

describe('DlgDatosvtaComponent', () => {
  let component: DlgDatosvtaComponent;
  let fixture: ComponentFixture<DlgDatosvtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgDatosvtaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgDatosvtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
