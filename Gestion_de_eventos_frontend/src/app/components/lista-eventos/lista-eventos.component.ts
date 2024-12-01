import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css'],
})
export class ListaEventosComponent implements OnInit {
  listaEventos: Evento[] = [];
  loading: boolean = false;

  constructor(
    private _eventoServices: EventoService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getListaEventos();
  }

  /* 
Función para obtener la lista de eventos:
- Método: getListaEventos
- Descripción: Esta función se encarga de cargar la lista de eventos desde el servicio y manejar el estado de carga.

Descripción del funcionamiento:
- Se establece la variable loading en true para indicar que se está procesando la solicitud.
- Se llama al método getListaEventos del servicio _eventoServices:
  - En caso de éxito (next):
    - Se registra la respuesta recibida (data) en la consola para fines de depuración.
    - Se asigna la lista de eventos a la propiedad listaEventos, que se utilizará para mostrar los eventos en la interfaz de usuario.
  - En caso de error (error):
    - Se registra un mensaje de error en la consola.
    - Se establece loading en false para indicar que la solicitud ha finalizado.
    - Se muestra una advertencia utilizando el servicio toast, informando al usuario que hubo un problema al obtener la lista de eventos.
  - En caso de completar (complete):
    - Se establece loading en false para indicar que la solicitud ha finalizado, independientemente del resultado.

Esta función está diseñada para facilitar la obtención y visualización de eventos, gestionando adecuadamente los estados de carga y los posibles errores durante el proceso.
*/
  getListaEventos() {
    this.loading = true;
    this._eventoServices.getListaEventos().subscribe({
      next: (data) => {
        console.log('data', data);
        this.listaEventos = data;
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

  /* 
Función para eliminar un evento:
- Método: eliminarEvento
- Parámetro: idEvento (number) - Identificador único del evento que se desea eliminar.
- Descripción: Esta función gestiona el proceso de eliminación de un evento y maneja el estado de carga.

Descripción del funcionamiento:
- Se establece la variable loading en true para indicar que se está procesando la solicitud.
- Se registra en la consola el ID del evento que se va a eliminar para fines de depuración.
- Se llama al método deleteEvento del servicio _eventoServices, pasando el idEvento como argumento:
  - En caso de éxito (next):
    - Se registra la respuesta de eliminación en la consola.
  - En caso de error (error):
    - Se registra un mensaje de error en la consola, mostrando el error recibido.
    - Se muestra una advertencia utilizando el servicio toast, informando al usuario que hubo un problema al eliminar el evento específico.
    - Se llama a la función getListaEventos para actualizar la lista de eventos después del intento de eliminación.
  - En caso de completar (complete):
    - Se muestra una advertencia utilizando el servicio toast, informando al usuario que la eliminación del evento fue exitosa.
    - Se llama nuevamente a la función getListaEventos para actualizar la lista de eventos.

Esta función está diseñada para facilitar la eliminación de eventos, gestionando adecuadamente los estados de carga y los posibles errores durante el proceso, así como para mantener actualizada la lista de eventos después de una eliminación.
*/
  eliminarEvento(idEvento: number) {
    this.loading = true;
    console.log('Evento a eliminar:', idEvento);

    this._eventoServices.deleteEvento(idEvento).subscribe({
      next: (response) => {
        console.log('Respuesta de eliminación:', response);
      },
      error: (e) => {
        console.error('Error al eliminar evento:', e.error);
        this.toast.warning(
          `Error al eliminar el Evento: ${idEvento}!`,
          'Info Gestion de Eventos'
        );
        this.getListaEventos();
      },
      complete: () => {
        this.toast.warning(
          `Exito al eliminar el Evento: ${idEvento}!`,
          'Info Gestion de Eventos'
        );
        this.getListaEventos();
      },
    });
  }
}
