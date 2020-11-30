import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { getGoToDestinations, getGoToDestination, validateCode } from './utils/norma-functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'aspectos-teoricos-maquina-norma';

  inputCodeControl = new FormControl('');

  linhasArray: string[] = [];
  linhaAtual: number | null = null;
  inputCodeValid = false;

  operacoesArray: string[] = [];

  inputInitialValuesControl = new FormControl('');
  registradoresArray: number[] = [];
  initialValueValid = true;

  executionComplete = false;

  ngOnInit(): void {

    for (let i = 0; i < 64; i++) {
      this.registradoresArray.push(0);
    }

    this.inputCodeControl.valueChanges.pipe(debounceTime(500)).subscribe((inputCode: string) => {
      this.linhasArray = inputCode.split(/\n/).map(line => line.trim()).filter(line => line !== '');
      this.inputCodeValid = validateCode(this.linhasArray);
      getGoToDestinations();
    });

    this.inputInitialValuesControl.valueChanges.pipe(debounceTime(200)).subscribe((inputInitialValues: string) => {
      this.resetRegistradores();

      let inputError = false;

      const initialValues = inputInitialValues.split(' ').filter(value => value !== '').map(value => {
        const num = parseInt(value, 10);
        if (isNaN(num)) {
          inputError = true;
        }
        return num;
      });

      if (inputError) {
        this.initialValueValid = false;
      } else {
        this.initialValueValid = true;

        while (initialValues.length > 64) {
          initialValues.pop();
        }

        for (let i = 0; i < initialValues.length; i++) {
          this.registradoresArray[i] = initialValues[i];
        }
      }
    });
  }

  inputCodeState(state: boolean): void {
    console.log(state);
    this.inputCodeValid = state;
  }

  run(): void {
    this.resetRegistradores();
  }

  resetRegistradores(): void {
    this.registradoresArray.map(_ => 0);
  }
}
