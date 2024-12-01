import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Certificado } from 'src/app/interfaces/certificado';
import { CertificadosService } from 'src/app/services/certificados.service';
import { ExisteTokenService } from 'src/app/services/existe-token.service';

@Component({
  selector: 'app-lista-certificados-porusuario',
  templateUrl: './lista-certificados-porusuario.component.html',
  styleUrls: ['./lista-certificados-porusuario.component.css'],
})
export class ListaCertificadosPorusuarioComponent implements OnInit {
  loading: boolean = false;
  certificados: Certificado[] = [];
  existeToken = false;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _certificadosService: CertificadosService,
    private toast: ToastrService,
    private existe_token: ExisteTokenService
  ) {}

  ngOnInit(): void {
    this.existeToken = this.existe_token.existeToken();
    this.route.queryParams.subscribe((params) => {
      const email = params['email'];
      if (email) {
        this.buscarCertificados(email);
      }
    });
  }

  buscarCertificados(email: string) {
    this.loading = true;
    this._certificadosService.getlistarCertificados(email).subscribe({
      next: (data) => {
        console.log('data', data);
        this.certificados = data;
      },
      error: (err) => {
        console.error('Error al obtener la lista de certficados:', err);
        this.loading = false;
        this.toast.warning(
          'Error al obtener la lista de certificados!',
          'Info Gestion de Eventos'
        );
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  imprimir(c: any): void {
    console.log('certificado:', c);
  }
}
