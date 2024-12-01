import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ListaEventosComponent } from './components/lista-eventos/lista-eventos.component';
import { AgregarEliminarEventosComponent } from './components/agregar-eliminar-eventos/agregar-eliminar-eventos.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './utils/auth.guard';
import { ListaEventosProximosComponent } from './components/lista-eventos-proximos/lista-eventos-proximos.component';
import { ListaParticipantesPoreventoComponent } from './components/lista-participantes-porevento/lista-participantes-porevento.component';
import { ListaCertificadosPorusuarioComponent } from './components/lista-certificados-porusuario/lista-certificados-porusuario.component';

/* 
Configuración de rutas para la aplicación Angular:
- Se define un conjunto de rutas utilizando el arreglo 'routes' que determina la navegación dentro de la aplicación.
- Ruta principal (''):
  - Carga el componente DashboardComponent, que sirve como la página de inicio.
- Ruta para 'listaDeEventos':
  - Carga el componente ListaEventosComponent y está protegida por AuthGuard, asegurando que solo los usuarios autenticados puedan acceder.
- Ruta para 'login':
  - Carga el componente LoginComponent, permitiendo a los usuarios iniciar sesión.
- Ruta para 'agregarEvento':
  - Carga el componente AgregarEliminarEventosComponent y está protegida por AuthGuard.
- Ruta para 'editarEvento/:id':
  - Carga el componente AgregarEliminarEventosComponent para editar un evento específico, también protegida por AuthGuard.
- Ruta para 'eventosProximos':
  - Carga el componente ListaEventosProximosComponent, accesible sin autenticación.
- Ruta para 'asistentesAevento/:id':
  - Carga el componente ListaParticipantesPoreventoComponent y está protegida por AuthGuard, mostrando los asistentes a un evento específico.
- Ruta para 'listadecertificados':
  - Carga el componente ListaCertificadosPorusuarioComponent, accesible sin autenticación.
- Ruta comodín ('**'):
  - Redirige a la ruta principal ('') si no se encuentra ninguna coincidencia.

Este conjunto de rutas está diseñado para facilitar la navegación dentro de la aplicación, asegurando que las áreas sensibles estén protegidas y que los usuarios puedan acceder fácilmente a las funcionalidades necesarias.
*/
const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'listaDeEventos',
    component: ListaEventosComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'agregraEvento',
    component: AgregarEliminarEventosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editarEvento/:id',
    component: AgregarEliminarEventosComponent,
    canActivate: [AuthGuard],
  },
  { path: 'eventosProximos', component: ListaEventosProximosComponent },
  {
    path: 'asistentesAevento/:id',
    component: ListaParticipantesPoreventoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listadecertificados',
    component: ListaCertificadosPorusuarioComponent,
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
