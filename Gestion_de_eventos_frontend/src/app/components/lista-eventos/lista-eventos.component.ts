import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/interfaces/evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css'],
})
export class ListaEventosComponent implements OnInit {
  listaEventos: Evento[] = [];

  constructor(private _eventoServices: EventoService) {}

  ngOnInit(): void {
    this.getListaEventos();
  }

  getListaEventos() {
    this._eventoServices.getListaEventos().subscribe((data) => {
      console.log(data);
    });
  }

  eliminarEvento(id: number) {}
}
