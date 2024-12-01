import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/interfaces/evento';
import { Usuario } from 'src/app/interfaces/usuario';
import { EventoService } from 'src/app/services/evento.service';
import { ExisteTokenService } from 'src/app/services/existe-token.service';
import { RegistroAsistenciaService } from 'src/app/services/registro-asistencia.service';

@Component({
  selector: 'app-lista-eventos-proximos',
  templateUrl: './lista-eventos-proximos.component.html',
  styleUrls: ['./lista-eventos-proximos.component.css'],
})
export class ListaEventosProximosComponent implements OnInit {
  form: FormGroup;
  listaEventosProximos: Evento[] = [];
  loading: boolean = false;
  eventoSeleccionado: any | null = null;
  eventoParaAsistir: any | null = null;
  eventoParaAsistir_id: any | null = null;
  dni: number | null = null;
  existeToken = false;

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private _eventoServices: EventoService,
    private _registroAsistencia: RegistroAsistenciaService,
    private toast: ToastrService,
    private existe_token: ExisteTokenService
  ) {
    this.form = this.fb.group({
      nombre_usuario: ['', Validators.required, Validators.maxLength(100)],
      email_usuario: ['', Validators.required],
      telefono_usuario: [''],
      direccion_usuario: [''],
      sexo_usuario: [''],
      dni_usuario: [''],
    });
  }

  ngOnInit(): void {
    this.existeToken = this.existe_token.existeToken();
    this.getListaEventosProximos();
  }

  getListaEventosProximos() {
    this.loading = true;
    this._eventoServices.getEventosProximos().subscribe({
      next: (data) => {
        console.log('data', data);
        this.listaEventosProximos = data;
      },
      error: (err) => {
        console.error('Error al obtener la lista de eventos:', err);
        this.loading = false;
        this.toast.warning(
          'Error al obtener la lista de eventos!',
          'Info Gestion de Eventos'
        );
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  verDetalles(evento: any): void {
    this.eventoSeleccionado = evento;
    console.log('Evento seleccionado:', evento);
  }

  asistir(eventoAsistir: any): void {
    console.log('Asistir:', eventoAsistir);
    this.eventoSeleccionado = null;
    this.eventoParaAsistir = eventoAsistir;
  }

  agregarAsistencia() {
    this.loading = true;
    this.eventoParaAsistir_id = this.eventoParaAsistir.id_evento;
    this.eventoParaAsistir = null;

    const U_Asistir_alEvento: Usuario = {
      nombre_usuario: this.form.value.nombre_usuario,
      email_usuario: this.form.value.email_usuario,
      telefono_usuario: this.form.value.telefono_usuario,
      direccion_usuario: this.form.value.direccion_usuario,
      sexo_usuario: this.form.value.sexo_usuario,
      dni_usuario: this.form.value.dni_usuario,
    };

    console.log(U_Asistir_alEvento);

    this._registroAsistencia
      .addRegistroAsistencia_Usuario(
        this.eventoParaAsistir_id,
        U_Asistir_alEvento
      )
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          console.log(
            `Asistencia del Usuario ${U_Asistir_alEvento.nombre_usuario} al evento}:`,
            response
          );
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          console.error(`Error al crear la asistencia al evento:`, e);

          // Construimos un mensaje con todos los errores
          let mensajeErrores = 'Error al crear la asistencia al Evento:\n';
          if (e.error && typeof e.error === 'object') {
            const mensajes = Object.values(e.error);

            if (mensajes.length > 2) {
              mensajeErrores = 'El formulario contiene múltiples errores';
            } else {
              mensajeErrores = mensajes.map((msg) => `- ${msg}`).join('\n');
            }
          } else {
            console.log('Ya estabas registrado al Evento!', e);
            mensajeErrores += 'Ya estabas registrado al Evento!.';
          }

          this.toast.warning(mensajeErrores, 'Info Gestión de Eventos');
        },
        complete: () => {
          this.loading = false;
          this.toast.success(
            `Éxito al crear Asistencia al Evento: ${this.form.value.nombre_usuario}!`,
            'Info Gestión de Eventos'
          );
          this._router.navigate(['dashboard']);
        },
      });
  }
}
