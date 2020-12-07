import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { codeValidator } from './utils/norma-code-validator.util';
import { runMachine } from './utils/norma-execution.util';
import {
  getInitialValueValid, setInitialValueValid, getInputCodeValid,
  getExecuting, getExecutionComplete, resetVariables, setStopped
} from './utils/norma-global-objects.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'aspectos-teoricos-maquina-norma';

  inputCodeControl = new FormControl('');

  linhasArray: string[] = [];

  operacoesArray: string[] = [];

  inputInitialValuesControl = new FormControl('');
  registradoresArray: number[] = [];

  ngOnInit(): void {

    for (let i = 0; i < 64; i++) {
      this.registradoresArray.push(0);
    }

    this.inputCodeControl.valueChanges.pipe(debounceTime(500)).subscribe((inputCode: string) => {
      this.linhasArray = inputCode.split(/\n/).map(line => line.trim()).filter(line => line !== '');
      codeValidator(this.linhasArray);
    });

    this.resetInput();
  }

  getVarInputCodeValid(): boolean {
    return getInputCodeValid();
  }

  getVarInitialValueValid(): boolean {
    return getInitialValueValid();
  }

  getVarExecuting(): boolean {
    return getExecuting();
  }

  getVarExecutionComplete(): boolean {
    return getExecutionComplete();
  }

  run(): void {
    runMachine(this.linhasArray, this.registradoresArray);
  }

  stop(): void {
    setStopped(true);
  }

  reset(): void {
    this.resetRegistradores();
    resetVariables();
    this.resetInput();
  }

  resetRegistradores(): void {
    this.registradoresArray = this.registradoresArray.map(_ => 0);
  }
  resetInput(): void {
    this.inputInitialValuesControl = new FormControl('');
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
        setInitialValueValid(false);
      } else {
        setInitialValueValid(true);

        while (initialValues.length > 64) {
          initialValues.pop();
        }

        for (let i = 0; i < initialValues.length; i++) {
          this.registradoresArray[i] = initialValues[i];
        }
      }
    });
  }
}
