import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
/* import { ListProductsComponent } from './components/list-products/list-products.component'; 
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';*/
import { ListaEventosComponent } from './components/lista-eventos/lista-eventos.component';
import { AgregarEliminarEventosComponent } from './components/agregar-eliminar-eventos/agregar-eliminar-eventos.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: ListaEventosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'agregraEvento', component: AgregarEliminarEventosComponent },
  { path: 'editarEvento/:id', component: AgregarEliminarEventosComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
