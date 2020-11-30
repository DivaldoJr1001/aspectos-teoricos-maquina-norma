import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatrizRegistradoresComponent } from './matriz-registradores/matriz-registradores.component';
import { ListaCodigoLinhasComponent } from './lista-codigo-linhas/lista-codigo-linhas.component';
import { ListaOperacoesComponent } from './lista-operacoes/lista-operacoes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';

@NgModule({
  declarations: [
    AppComponent,
    MatrizRegistradoresComponent,
    ListaCodigoLinhasComponent,
    ListaOperacoesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
