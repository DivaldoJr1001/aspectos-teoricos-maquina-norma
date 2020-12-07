import { Component, Input, OnInit } from '@angular/core';
import { getRegistradorAtual, getRegistradoresArray } from '../utils/norma-global-objects.util';

@Component({
  selector: 'app-matriz-registradores',
  templateUrl: './matriz-registradores.component.html',
  styleUrls: ['./matriz-registradores.component.scss']
})
export class MatrizRegistradoresComponent implements OnInit {

  registradoresArray: number[] = [];

  constructor() { }

  ngOnInit() {
    this.registradoresArray = getRegistradoresArray();
  }

  getVarRegistradorAtual(): number {
    return getRegistradorAtual();
  }

}
