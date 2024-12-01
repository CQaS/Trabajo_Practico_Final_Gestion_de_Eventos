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

  /* 
Función para agregar la asistencia de un usuario a un evento:
- Método: agregarAsistencia
- Descripción: Esta función gestiona el proceso de registro de asistencia de un usuario a un evento y maneja el estado de carga.

Descripción del funcionamiento:
- Se establece la variable loading en true para indicar que se está procesando la solicitud.
- Se asigna el ID del evento al que se desea asistir a la variable eventoParaAsistir_id y se establece eventoParaAsistir en null para liberar el objeto.
- Se crea un objeto U_Asistir_alEvento de tipo Usuario con los datos ingresados en el formulario:
  - nombre_usuario: Nombre del usuario.
  - email_usuario: Correo electrónico del usuario.
  - telefono_usuario: Número de teléfono del usuario.
  - direccion_usuario: Dirección del usuario.
  - sexo_usuario: Sexo del usuario.
  - dni_usuario: Documento Nacional de Identidad del usuario.
- Se registra en la consola el objeto U_Asistir_alEvento para fines de depuración.
- Se llama al método addRegistroAsistencia_Usuario del servicio _registroAsistencia, pasando el ID del evento y el objeto U_Asistir_alEvento como argumentos:
  - En caso de éxito (next):
    - Se establece loading en false para indicar que la solicitud ha finalizado.
    - Se registra un mensaje en la consola confirmando la asistencia del usuario al evento junto con la respuesta recibida.
  - En caso de error (error):
    - Se establece loading en false para indicar que la solicitud ha finalizado.
    - Se registra un mensaje de error en la consola, mostrando el error recibido.
    - Se construye un mensaje con todos los errores devueltos por la API:
      - Si hay errores específicos, se listan. Si hay múltiples errores, se indica que hay múltiples problemas en el formulario.
      - Si no hay errores específicos, se muestra un mensaje indicando que el usuario ya estaba registrado para el evento.
    - Se muestra una advertencia utilizando el servicio toast, informando al usuario sobre los errores ocurridos durante el registro.
  - En caso de completar (complete):
    - Se establece loading en false para indicar que la solicitud ha finalizado, independientemente del resultado.
    - Se muestra un mensaje de éxito utilizando el servicio toast, confirmando que la asistencia fue registrada correctamente.
    - Se navega a la ruta 'dashboard' utilizando el router.

Esta función está diseñada para facilitar el registro de asistencia de usuarios a eventos, gestionando adecuadamente los estados de carga y los posibles errores durante el proceso, así como proporcionando retroalimentación al usuario sobre el resultado de su acción.
*/
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
