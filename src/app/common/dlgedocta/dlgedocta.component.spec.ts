import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DlgedoctaComponent } from './dlgedocta.component';

describe('DlgedoctaComponent', () => {
  let component: DlgedoctaComponent;
  let fixture: ComponentFixture<DlgedoctaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DlgedoctaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DlgedoctaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
