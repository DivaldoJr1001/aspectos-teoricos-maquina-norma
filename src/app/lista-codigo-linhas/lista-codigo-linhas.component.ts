import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-codigo-linhas',
  templateUrl: './lista-codigo-linhas.component.html',
  styleUrls: ['./lista-codigo-linhas.component.scss']
})
export class ListaCodigoLinhasComponent implements OnInit {

  @Input() codeValueChangeObservable: Observable<any>;
  @Input() linhasArray: string[] = [];
  @Input() linhaAtual: number | null = null;
  @Input() isCodeValid = true;

  constructor() { }

  ngOnInit() {
  }

}
