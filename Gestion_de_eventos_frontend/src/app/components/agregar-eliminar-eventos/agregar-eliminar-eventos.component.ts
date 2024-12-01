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

  /* 
Función para agregar o editar un evento:
- Método: agregarEvento
- Descripción: Esta función gestiona el proceso de creación o edición de un evento, dependiendo del estado del ID del evento.

Descripción del funcionamiento:
- Se establece la variable loading en true para indicar que se está procesando la solicitud.
- Se crea un objeto evento de tipo Evento con los datos ingresados en el formulario:
  - nombre_evento: Nombre del evento.
  - fecha_evento: Fecha del evento.
  - ubicacion_evento: Ubicación donde se llevará a cabo el evento.
  - descripcion_evento: Descripción del evento.
  - organizador_id: ID del organizador del evento.
- Se verifica si el ID del evento es diferente de 0:
  - Si es así, se trata de una edición. Se asigna el ID al objeto evento y se llama a la función procesarEvento, pasando el método editEvento del servicio _eventosServices y la acción 'editar'.
  - Si no, se trata de una creación. Se llama a la función procesarEvento, pasando el método addEvento del servicio _eventosServices y la acción 'agregar'.

Función privada para procesar la creación o edición de un evento:
- Método: procesarEvento
- Parámetros:
  - observable (Observable<any>) - Observable que representa la operación de agregar o editar un evento.
  - accion ('editar' | 'agregar') - Indica si se está editando o agregando un evento.

Descripción del funcionamiento:
- Se determina el mensaje de éxito y error basado en la acción (editar o agregar).
- Se suscribe al observable:
  - En caso de éxito (next):
    - Se establece loading en false para indicar que la solicitud ha finalizado.
    - Se registra en la consola la respuesta recibida, confirmando la acción realizada.
  - En caso de error (error):
    - Se establece loading en false para indicar que la solicitud ha finalizado.
    - Se registra un mensaje de error en la consola, mostrando el error recibido.
    - Se construye un mensaje con todos los errores devueltos por la API:
      - Si hay errores específicos, se listan. Si hay múltiples errores, se indica que hay múltiples problemas en el formulario.
      - Si no hay errores específicos, se muestra un mensaje indicando que ocurrió un error inesperado.
    - Se muestra una advertencia utilizando el servicio toast, informando al usuario sobre los errores ocurridos durante la operación.
  - En caso de completar (complete):
    - Se establece loading en false para indicar que la solicitud ha finalizado, independientemente del resultado.
    - Se muestra un mensaje de éxito utilizando el servicio toast, confirmando que el evento fue agregado o editado correctamente.
    - Se navega a la ruta principal utilizando el router.

Estas funciones están diseñadas para facilitar tanto la creación como la edición de eventos, gestionando adecuadamente los estados de carga y los posibles errores durante el proceso, así como proporcionando retroalimentación al usuario sobre el resultado de su acción.
*/
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

  /* 
Función para buscar un evento por su ID:
- Método: buscarEvento
- Parámetro: id (number) - Identificador único del evento que se desea buscar.
- Descripción: Esta función gestiona el proceso de búsqueda de un evento y actualiza el formulario con los datos del evento encontrado.

Descripción del funcionamiento:
- Se establece la variable loading en true para indicar que se está procesando la solicitud.
- Se llama al método getEventoById del servicio _eventosServices, pasando el ID del evento como argumento:
  - En caso de éxito (next):
    - Se establece la propiedad evento en true, indicando que se ha encontrado un evento.
    - Se registra en la consola el evento encontrado (data) para fines de depuración.
    - Se actualiza el formulario con los datos del evento encontrado, utilizando el método setValue para establecer los valores de los campos:
      - nombre_evento: Nombre del evento.
      - fecha_evento: Fecha del evento.
      - ubicacion_evento: Ubicación donde se llevará a cabo el evento.
      - descripcion_evento: Descripción del evento.
      - organizador_id: ID del organizador del evento.
  - En caso de error (error):
    - Se establece la propiedad evento en false, indicando que no se ha encontrado un evento.
    - Se registra un mensaje de error en la consola, mostrando el error recibido.
    - Se muestra una advertencia utilizando el servicio toast, informando al usuario que el evento no fue encontrado.
  - En caso de completar (complete):
    - Se establece la propiedad evento en true, indicando que la búsqueda ha finalizado.
    - Se registra un mensaje en la consola indicando que la búsqueda de evento ha sido completada.
    - Se establece loading en false para indicar que la solicitud ha finalizado.

Esta función está diseñada para facilitar la búsqueda de eventos por su ID, gestionando adecuadamente los estados de carga y los posibles errores durante el proceso, así como actualizando el formulario con los datos del evento encontrado si es exitoso.
*/
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
