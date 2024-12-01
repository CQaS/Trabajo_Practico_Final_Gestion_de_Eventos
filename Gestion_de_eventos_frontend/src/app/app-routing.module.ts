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
