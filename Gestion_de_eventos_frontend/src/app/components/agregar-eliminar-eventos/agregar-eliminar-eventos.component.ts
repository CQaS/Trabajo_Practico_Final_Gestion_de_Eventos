import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/services/evento.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-agregar-eliminar-eventos',
  templateUrl: './agregar-eliminar-eventos.component.html',
  styleUrls: ['./agregar-eliminar-eventos.component.css'],
})
export class AgregarEliminarEventosComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  op: string = 'Agregar ';
  evento: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _eventosServices: EventoService,
    private toast: ToastrService,
    private _router: Router,
    private params: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre_evento: ['', [Validators.required, Validators.maxLength(100)]],
      fecha_evento: ['', Validators.required],
      ubicacion_evento: ['', Validators.required],
      descripcion_evento: ['', Validators.required],
      organizador_id: ['', Validators.required],
    });
    this.id = Number(this.params.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.evento = false;
    if (this.id != 0) {
      this.op = 'Editar ';
      this.buscarEvento(this.id);
      this.loading = false;
    }
  }

  agregarEvento() {
    this.loading = true;

    const evento: Evento = {
      nombre_evento: this.form.value.nombre_evento,
      fecha_evento: this.form.value.fecha_evento,
      ubicacion_evento: this.form.value.ubicacion_evento,
      descripcion_evento: this.form.value.descripcion_evento,
      organizador_id: this.form.value.organizador_id,
    };

    if (this.id !== 0) {
      // Modo editar
      evento.id_evento = this.id;
      this.procesarEvento(
        this._eventosServices.editEvento(this.id, evento),
        'editar'
      );
    } else {
      // Modo agregar
      this.procesarEvento(this._eventosServices.addEvento(evento), 'agregar');
    }
  }

  private procesarEvento(
    observable: Observable<any>,
    accion: 'editar' | 'agregar'
  ) {
    const mensajeExito = accion === 'editar' ? 'editado' : 'agregado';
    const mensajeError = accion === 'editar' ? 'editar' : 'agregar';

    observable.subscribe({
      next: (response: any) => {
        this.loading = false;
        console.log(`Respuesta de ${mensajeExito}:`, response);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        console.error(`Error al ${mensajeError} el evento:`, e.error);

        // Construimos un mensaje con todos los errores
        let mensajeErrores = 'Error al ' + mensajeError + ' el Evento:\n';
        if (e.error && typeof e.error === 'object') {
          const mensajes = Object.values(e.error);

          if (mensajes.length > 2) {
            mensajeErrores = 'El formulario contiene múltiples errores';
          } else {
            mensajeErrores = mensajes.map((msg) => `- ${msg}`).join('\n');
          }
        } else {
          mensajeErrores += 'Ocurrió un error inesperado.';
        }

        this.toast.warning(mensajeErrores, 'Info Gestión de Eventos');
      },
      complete: () => {
        this.loading = false;
        this.toast.success(
          `Éxito al ${mensajeExito} el Evento: ${this.form.value.nombre_evento}!`,
          'Info Gestión de Eventos'
        );
        this._router.navigate(['/']);
      },
    });
  }

  buscarEvento(id: number): void {
    this.loading = true;

    this._eventosServices.getEventoById(id).subscribe({
      next: (data: Evento) => {
        this.evento = true;
        console.log('Evento encontrado:', data);
        this.form.setValue({
          nombre_evento: data.nombre_evento,
          fecha_evento: data.fecha_evento,
          ubicacion_evento: data.ubicacion_evento,
          descripcion_evento: data.descripcion_evento,
          organizador_id: data.organizador_id,
        });
      },
      error: (err) => {
        this.evento = false;
        console.error('Error al buscar el evento:', err);
        this.toast.warning('Evento no encontrado!', 'Info Gestión de Eventos');
      },
      complete: () => {
        this.evento = true;
        console.log('Búsqueda de evento completada.');
        this.loading = false;
      },
    });
  }
}
