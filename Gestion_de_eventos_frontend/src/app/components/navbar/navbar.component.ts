import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExisteTokenService } from 'src/app/services/existe-token.service';
import { buscarCertif } from '../../utils/buscarCertif.utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
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

  logout() {
    localStorage.removeItem('token');
    this.existeToken = false;
    this.router.navigate(['/dashboard']);
  }
}
