import { Router } from '@angular/router';

export function buscarCertif(router: Router, param: string) {
  console.log('Email/Certificado', param);
  router.navigate(['/listadecertificados'], {
    queryParams: { email: param },
  });
}
