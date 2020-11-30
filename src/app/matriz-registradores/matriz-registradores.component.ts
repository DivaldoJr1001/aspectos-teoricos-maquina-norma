import { Component, Input, OnInit } from '@angular/core';

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

}
