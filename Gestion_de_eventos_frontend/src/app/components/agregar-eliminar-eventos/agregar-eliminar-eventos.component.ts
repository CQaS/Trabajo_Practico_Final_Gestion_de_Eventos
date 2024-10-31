import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Evento } from 'src/app/interfaces/evento';

@Component({
  selector: 'app-agregar-eliminar-eventos',
  templateUrl: './agregar-eliminar-eventos.component.html',
  styleUrls: ['./agregar-eliminar-eventos.component.css'],
})
export class AgregarEliminarEventosComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre_evento: ['', [Validators.required, Validators.maxLength(100)]],
      fecha_evento: ['', Validators.required],
      ubicacion_evento: ['', Validators.required],
      descripcion_evento: ['', Validators.required],
      organizador_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  agregarEvento() {
    console.log(this.form.value.nombre_evento);
    console.log(this.form.get('nombre_evento')?.value);
    const evento: Evento = {
      nombre_evento: this.form.value.nombre_evento,
      fecha_evento: this.form.value.fecha_event,
      ubicacion_evento: this.form.value.ubicacion_evento,
      descripcion_evento: this.form.value.descripcion_evento,
      organizador_id: this.form.value.organizador_id,
    };
  }
}
