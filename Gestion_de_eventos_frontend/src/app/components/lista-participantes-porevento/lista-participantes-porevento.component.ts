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
}
