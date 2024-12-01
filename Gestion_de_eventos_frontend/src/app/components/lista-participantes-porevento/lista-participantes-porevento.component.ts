import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistroAsistencia } from 'src/app/interfaces/registroAsistencia';
import { RegistroAsistenciaService } from 'src/app/services/registro-asistencia.service';

@Component({
  selector: 'app-lista-participantes-porevento',
  templateUrl: './lista-participantes-porevento.component.html',
  styleUrls: ['./lista-participantes-porevento.component.css'],
})
export class ListaParticipantesPoreventoComponent implements OnInit {
  listar_usuariosPorEvento: RegistroAsistencia[] = [];
  loading: boolean = false;
  idEvento: number;

  constructor(
    private _registroAsistenciaService: RegistroAsistenciaService,
    private toast: ToastrService,
    private params: ActivatedRoute
  ) {
    this.idEvento = Number(params.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getListaAsistenteAlEvento(this.idEvento);
  }

  /* 
Función para obtener la lista de usuarios asistentes a un evento:
- Método: getListaAsistenteAlEvento
- Parámetro: idEvento (number) - Identificador único del evento del cual se desean listar los usuarios asistentes.
- Descripción: Esta función se encarga de cargar la lista de usuarios asistentes desde el servicio y manejar el estado de carga.

Descripción del funcionamiento:
- Se establece la variable loading en true para indicar que se está procesando la solicitud.
- Se llama al método getlistarUsuariosAsistentes del servicio _registroAsistenciaService, pasando el idEvento como argumento:
  - En caso de éxito (next):
    - Se registra la respuesta recibida (data) en la consola para fines de depuración.
    - Se asigna la lista de usuarios asistentes a la propiedad listar_usuariosPorEvento, que se utilizará para mostrar los usuarios en la interfaz de usuario.
  - En caso de error (error):
    - Se registra un mensaje de error en la consola, mostrando el error recibido.
    - Se establece loading en false para indicar que la solicitud ha finalizado.
    - Se muestra una advertencia utilizando el servicio toast, informando al usuario que hubo un problema al obtener la lista de usuarios asistentes.
  - En caso de completar (complete):
    - Se establece loading en false para indicar que la solicitud ha finalizado, independientemente del resultado.

Esta función está diseñada para facilitar la obtención y visualización de los usuarios que asistieron a un evento específico, gestionando adecuadamente los estados de carga y los posibles errores durante el proceso.
*/
  getListaAsistenteAlEvento(idEvento: number) {
    this.loading = true;
    this._registroAsistenciaService
      .getlistarUsuariosAsistentes(idEvento)
      .subscribe({
        next: (data) => {
          console.log('data', data);
          this.listar_usuariosPorEvento = data;
        },
        error: (err) => {
          console.error(
            'Error al obtener la lista de Usuarios asistentes:',
            err
          );
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
Función para confirmar o editar la asistencia de un usuario a un evento:
- Método: confirmarAsistencia
- Parámetros:
  - eventCheck (Event) - Evento del checkbox que indica si el usuario asistió o no.
  - e (any) - Objeto que contiene información sobre el registro de asistencia y el usuario.

Descripción del funcionamiento:
- Se obtiene el estado del checkbox (checked) a partir del evento eventCheck.
- Se registra en la consola un mensaje que indica el nombre del usuario, su estado de asistencia previo y el estado actual del checkbox.
- Se crea un objeto editRegistro de tipo RegistroAsistencia con la siguiente información:
  - evento_id: ID del evento al que se refiere la asistencia.
  - usuario_id: ID del usuario cuya asistencia se está editando.
  - asistio: valor booleano que indica si el usuario asistió (true) o no (false), basado en el estado del checkbox.
- Se registra en la consola los datos del registro que se van a editar para fines de depuración.
- Se establece la variable loading en true para indicar que se está procesando la solicitud.
- Se llama al método editRegistroAsistencia del servicio _registroAsistenciaService, pasando el ID del registro y el objeto editRegistro como argumentos:
  - En caso de éxito (next):
    - Se registra la respuesta recibida en la consola.
  - En caso de error (error):
    - Se registra un mensaje de error en la consola, mostrando el error recibido.
    - Se establece loading en false para indicar que la solicitud ha finalizado.
    - Se muestra una advertencia utilizando el servicio toast, informando al usuario que hubo un problema al editar el registro de asistencia.
  - En caso de completar (complete):
    - Se establece loading en false para indicar que la solicitud ha finalizado, independientemente del resultado.
    - Se muestra un mensaje informativo utilizando el servicio toast, indicando que la edición del registro de asistencia fue exitosa.
    - Se llama a la función getListaAsistenteAlEvento para actualizar la lista de asistentes al evento.

Esta función está diseñada para facilitar la edición de registros de asistencia, gestionando adecuadamente los estados de carga y los posibles errores durante el proceso, así como para mantener actualizada la lista de asistentes después de realizar cambios.
*/
  confirmarAsistencia(eventCheck: Event, e: any): void {
    const chekeado = (eventCheck.target as HTMLInputElement).checked;
    console.log(
      `El usuario ${e.usuarios?.nombre_usuario} tiene asistencia marcada como ${e.asistio} y el checkbox esta ${chekeado}.`
    );

    const editRegistro: RegistroAsistencia = {
      evento_id: e.evento_id,
      usuario_id: e.usuarios?.id_usuario,
      asistio: chekeado,
    };

    console.log('Data del Registro a editar: ', editRegistro);

    this.loading = true;
    this._registroAsistenciaService
      .editRegistroAsistencia(e.id_registro, editRegistro)
      .subscribe({
        next: (data) => {
          console.log('data', data);
        },
        error: (err) => {
          console.error('Error al editar el resgistro de Asistencia', err);
          this.loading = false;
          this.toast.warning(
            'Error al editar el resgistro de Asistencia!',
            'Info Gestion de Eventos'
          );
        },
        complete: () => {
          this.loading = false;
          this.toast.info(
            'Editar el resgistro de Asistencia con Exito!',
            'Info Gestion de Eventos'
          );
          this.getListaAsistenteAlEvento(this.idEvento);
        },
      });
  }
}
