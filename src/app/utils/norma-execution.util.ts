import { delay } from './delay.util';
import {
  getEndToStartDestination,
  getGoToDestination,
  getStartToEndDestination,
  getStopped, setExecuting, setExecutionComplete,
  setLinhaAtual, setRegistradorAtual, setStopped
} from './norma-global-objects.util';

let registradoresArray: number[];

export async function runMachine(linhasArray: string[], registradores: number[]): Promise<void> {
  registradoresArray = registradores;
  setExecuting(true);

  const flag = false;

  for (let i = 0; i < linhasArray.length; i++) {
    const lineParts = linhasArray[i].split(' ');

    // Ignora comentários e rótulos de navegação
    if (lineParts[0].charAt(0) !== '#' && lineParts[0].charAt(0) !== ':') {
      setLinhaAtual(i);

      // ----------------------------------- //
      // TODO: Substituir por lógica de execução
      console.log(linhasArray[i]);
      setRegistradorAtual(i % 63);
      inc(5);
      // ----------------------------------- //

      await delay(1500);
    }

    if (getStopped()) {
      break;
    }
  }

  setExecuting(false);
  setStopped(false);
  setExecutionComplete(true);
}

function inc(target: number): void {
  registradoresArray[target]++;
}

function dec(target: number): void {
  if (registradoresArray[target] > 0) {
    registradoresArray[target]--;
  }
}

function set0(target: number): void {
  registradoresArray[target] = 0;
}

function is0(target: number): boolean {
  return registradoresArray[target] === 0;
}

function not0(target: number): boolean {
  return registradoresArray[target] !== 0;
}

function set(target: number, source: number): void {
  registradoresArray[target] = registradoresArray[source];
}

function add(target: number, source: number): void {
  registradoresArray[target] = registradoresArray[target] + registradoresArray[source];
}

function goto(label: string): number {
  return getGoToDestination(label);
}

function loopStart(endLine: number): number {
  return getEndToStartDestination(endLine);
}

function loopEnd(startLine: number): number {
  return getStartToEndDestination(startLine);
}
