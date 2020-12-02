import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { getInputCodeValid, getLinhaAtual } from '../utils/norma-global-objects.util';

@Component({
  selector: 'app-lista-codigo-linhas',
  templateUrl: './lista-codigo-linhas.component.html',
  styleUrls: ['./lista-codigo-linhas.component.scss']
})
export class ListaCodigoLinhasComponent implements OnInit {

  @Input() linhasArray: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  getVarLinhaAtual(): number {
    return getLinhaAtual();
  }

  getVarInputCodeValid(): boolean {
    return getInputCodeValid();
  }

}
