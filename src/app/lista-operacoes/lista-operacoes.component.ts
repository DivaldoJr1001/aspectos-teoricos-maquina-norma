import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-operacoes',
  templateUrl: './lista-operacoes.component.html',
  styleUrls: ['./lista-operacoes.component.scss']
})
export class ListaOperacoesComponent implements OnInit {

  @Input() operacoesArray: string[] = [];

  constructor() { }

  ngOnInit() {
  }

}
