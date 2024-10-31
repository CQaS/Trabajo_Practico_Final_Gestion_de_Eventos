import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEliminarEventosComponent } from './agregar-eliminar-eventos.component';

describe('AgregarEliminarEventosComponent', () => {
  let component: AgregarEliminarEventosComponent;
  let fixture: ComponentFixture<AgregarEliminarEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEliminarEventosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarEliminarEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
