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
