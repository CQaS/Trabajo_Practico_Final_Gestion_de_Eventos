import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-lista-eventos-proximos',
  templateUrl: './lista-eventos-proximos.component.html',
  styleUrls: ['./lista-eventos-proximos.component.css'],
})
export class ListaEventosProximosComponent implements OnInit {
  listaEventosProximos: Evento[] = [];
  loading: boolean = false;
  eventoSeleccionado: any | null = null;

  constructor(
    private _eventoServices: EventoService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
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
}
