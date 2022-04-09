import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CErrorComponent } from './cerror/cerror.component';
import { DetallesComponent } from './detalles/detalles.component';
import { HeaderComponent } from './header/header.component';
import { EProcessComponent } from './eprocess/eprocess.component';
import { DetenidasComponent } from './detenidas/detenidas.component';
import { PackageComponent } from './package/package.component';

@NgModule({
  declarations: [
    AppComponent,
    CErrorComponent,
    DetallesComponent,
    HeaderComponent,
    EProcessComponent,
    DetenidasComponent,
    PackageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
