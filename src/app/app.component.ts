import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { codeValidator } from './utils/norma-code-validator.util';
import { runMachine } from './utils/norma-execution.util';
import {
  getInitialValueValid, setInitialValueValid, getInputCodeValid,
  getExecuting, getExecutionComplete, resetVariables, setStopped, setLinhasArray,
  resetRegistradoresArray, setRegistradoresIniciais, setRegistradoresArray, resetLinhasArray, resetOperacoesArray
} from './utils/norma-global-objects.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'aspectos-teoricos-maquina-norma';

  inputCodeControl = new FormControl('');

  inputInitialValuesControl = new FormControl('');

  ngOnInit(): void {

    setRegistradoresArray();

    this.inputCodeControl.valueChanges.pipe(debounceTime(500)).subscribe((inputCode: string) => {
      resetLinhasArray();
      setLinhasArray(inputCode.split(/\n/).map(line => line.trim()).filter(line => line !== ''));
      codeValidator();
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
    runMachine();
  }

  stop(): void {
    setStopped(true);
  }

  reset(): void {
    resetRegistradoresArray();
    resetOperacoesArray();
    resetVariables();
    this.resetInput();
  }

  resetInput(): void {
    this.inputInitialValuesControl = new FormControl('');
    this.inputInitialValuesControl.valueChanges.pipe(debounceTime(200)).subscribe((inputInitialValues: string) => {
      resetRegistradoresArray();

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

        setRegistradoresIniciais(initialValues);
      }
    });
  }
}
