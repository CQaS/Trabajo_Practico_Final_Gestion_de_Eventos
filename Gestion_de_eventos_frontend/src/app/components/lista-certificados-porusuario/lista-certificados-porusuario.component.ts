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

  /* 
Función para buscar certificados por correo electrónico:
- Método: buscarCertificados
- Parámetro: email (string) - Correo electrónico del usuario para el cual se desean obtener los certificados.
- Descripción: Esta función se encarga de cargar la lista de certificados desde el servicio y manejar el estado de carga.

Descripción del funcionamiento:
- Se establece la variable loading en true para indicar que se está procesando la solicitud.
- Se llama al método getlistarCertificados del servicio _certificadosService, pasando el email como argumento:
  - En caso de éxito (next):
    - Se registra la respuesta recibida (data) en la consola para fines de depuración.
    - Se asigna la lista de certificados a la propiedad certificados, que se utilizará para mostrar los certificados en la interfaz de usuario.
  - En caso de error (error):
    - Se registra un mensaje de error en la consola, mostrando el error recibido.
    - Se establece loading en false para indicar que la solicitud ha finalizado.
    - Se muestra una advertencia utilizando el servicio toast, informando al usuario que hubo un problema al obtener la lista de certificados.
  - En caso de completar (complete):
    - Se establece loading en false para indicar que la solicitud ha finalizado, independientemente del resultado.

Esta función está diseñada para facilitar la obtención y visualización de certificados asociados a un usuario específico, gestionando adecuadamente los estados de carga y los posibles errores durante el proceso.
*/
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

  /* 
Función para imprimir un certificado:
- Método: imprimir
- Parámetro: c (any) - Objeto que representa el certificado, que incluye la URL del certificado a imprimir.
- Descripción: Esta función se encarga de obtener el contenido del certificado y abrirlo en una nueva ventana para su impresión.

Descripción del funcionamiento:
- Se registra en la consola el objeto del certificado (c) para fines de depuración.
- Se llama al método obtenerCertificadoPorCodigo del servicio _certificadosService, pasando la propiedad url_certificado del objeto c como argumento:
  - En caso de éxito (next):
    - Se abre una nueva ventana en blanco utilizando window.open.
    - Si la nueva ventana se abre correctamente, se escribe el contenido HTML del certificado en el documento de la nueva ventana.
    - Se invoca el método print() de la nueva ventana para iniciar el proceso de impresión.
  - En caso de error (error):
    - Se registra un mensaje de error en la consola, mostrando el error recibido.
    - Se muestra una advertencia utilizando el servicio toast, informando al usuario que hubo un problema al obtener el certificado.

Esta función está diseñada para facilitar la impresión de certificados, asegurando que se obtenga correctamente el contenido antes de enviarlo a la impresora y gestionando adecuadamente los errores que puedan surgir durante el proceso.
*/
  imprimir(c: any): void {
    console.log('certificado:', c);
    this._certificadosService
      .obtenerCertificadoPorCodigo(c.url_certificado)
      .subscribe({
        next: (htmlContent) => {
          const newWindow = window.open('', '_blank');
          if (newWindow) {
            newWindow.document.write(htmlContent);
            newWindow.print();
          }
        },
        error: (err) => {
          console.error('Error al obtener el certficado:', err);
          this.toast.warning(
            'Error al obtener el certificado!',
            'Info Gestion de Eventos'
          );
        },
      });
  }
}
