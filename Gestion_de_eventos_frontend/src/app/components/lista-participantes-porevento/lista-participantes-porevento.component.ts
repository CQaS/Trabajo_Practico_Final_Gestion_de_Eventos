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
