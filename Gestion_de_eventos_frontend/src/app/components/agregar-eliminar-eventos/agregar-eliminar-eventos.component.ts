import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-agregar-eliminar-eventos',
  templateUrl: './agregar-eliminar-eventos.component.html',
  styleUrls: ['./agregar-eliminar-eventos.component.css'],
})
export class AgregarEliminarEventosComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _eventosServices: EventoService,
    private toast: ToastrService,
    private _router: Router
  ) {
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
    this.loading = true;

    console.log(this.form.value.nombre_evento);
    console.log(this.form.get('nombre_evento')?.value);
    const evento: Evento = {
      nombre_evento: this.form.value.nombre_evento,
      fecha_evento: this.form.value.fecha_evento,
      ubicacion_evento: this.form.value.ubicacion_evento,
      descripcion_evento: this.form.value.descripcion_evento,
      organizador_id: this.form.value.organizador_id,
    };

    console.log('Evento a agregar', evento);

    this._eventosServices.addEvento(evento).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Respuesta de agregado:', response);
      },
      error: (e) => {
        this.loading = false;
        console.error('Error al agregar el evento:', e.error);
        this.toast.warning(
          'Error al agregar el Evento!',
          'Info Gestion de Eventos'
        );
      },
      complete: () => {
        this.loading = false;
        this.toast.success(
          `Exito al agregar el Evento: ${evento.nombre_evento}!`,
          'Info Gestion de Eventos'
        );
        this._router.navigate(['/']);
      },
    });
  }
}
