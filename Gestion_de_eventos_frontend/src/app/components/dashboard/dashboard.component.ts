import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExisteTokenService } from 'src/app/services/existe-token.service';
import { buscarCertif } from 'src/app/utils/buscarCertif.utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  existeToken = false;
  email: string = '';

  constructor(
    private router: Router,
    private existe_token: ExisteTokenService
  ) {}

  ngOnInit(): void {
    this.existeToken = this.existe_token.existeToken();
  }

  buscarCertificados() {
    buscarCertif(this.router, this.email);
  }
}
