import { Component, Input, OnInit } from '@angular/core';
import { getRegistradorAtual } from '../utils/norma-global-objects.util';

@Component({
  selector: 'app-matriz-registradores',
  templateUrl: './matriz-registradores.component.html',
  styleUrls: ['./matriz-registradores.component.scss']
})
export class MatrizRegistradoresComponent implements OnInit {

  @Input() registradoresArray: number[] = [];

  constructor() { }

  ngOnInit() {
  }

  getVarRegistradorAtual(): number {
    return getRegistradorAtual();
  }

}
