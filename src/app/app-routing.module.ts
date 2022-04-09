import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CErrorComponent } from './cerror/cerror.component';
import { DetallesComponent } from './detalles/detalles.component';
import { DetenidasComponent } from './detenidas/detenidas.component';
import { EProcessComponent } from './eprocess/eprocess.component';
import { HeaderComponent } from './header/header.component';
import { PackageComponent } from './package/package.component';


const routes: Routes = [{
  path : '',
  component:HeaderComponent,
  children:[
    {
      path:'Error',
      component:CErrorComponent,
    },
    {
      path:'Eproceso',
      component:EProcessComponent,
    },
    {
      path:'Detalles',
      component:DetallesComponent,
    },
    {
      path:'',
      component:PackageComponent,
    },
    {
      path:'SendDead',
      component:DetenidasComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
// @ngModule({
//   imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
//   exports: [RouterModule],
//   })
export class AppRoutingModule { }
