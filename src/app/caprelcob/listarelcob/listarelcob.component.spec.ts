import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarelcobComponent } from './listarelcob.component';

describe('ListarelcobComponent', () => {
  let component: ListarelcobComponent;
  let fixture: ComponentFixture<ListarelcobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarelcobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarelcobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
