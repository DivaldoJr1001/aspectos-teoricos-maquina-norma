import { Component, Input, OnInit } from '@angular/core';
import { getOperacoesArray } from '../utils/norma-global-objects.util';

@Component({
  selector: 'app-lista-operacoes',
  templateUrl: './lista-operacoes.component.html',
  styleUrls: ['./lista-operacoes.component.scss']
})
export class ListaOperacoesComponent implements OnInit {

  operacoesArray: string[] = [];

  constructor() { }

  ngOnInit() {
    this.operacoesArray = getOperacoesArray();
  }

}
