import { delay } from './delay.util';
import {
  addOperacao,
  getEndToStartDestination,
  getGoToDestination,
  getIfElseDestinations,
  getLinhasArray,
  getRegistrador,
  getStartToEndDestination,
  getStopped, setExecuting, setExecutionComplete,
  setLinhaAtual, setRegistrador, setRegistradorAtual, setStopped
} from './norma-global-objects.util';

export async function runMachine(): Promise<void> {
  const linhasArray = getLinhasArray();

  setExecuting(true);

  for (let i = 0; i < linhasArray.length; i++) {
    const lineParts = linhasArray[i].split(' ');
    // Ignora comentários e rótulos de navegação
    if (lineParts[0].charAt(0) !== '#' && lineParts[0].charAt(0) !== ':') {
      setLinhaAtual(i);

      const splitArray = linhasArray[i].split(' ');

      switch (splitArray[0]) {
        case 'inc':
          inc(parseInt(splitArray[1], 10));
          setRegistradorAtual(parseInt(splitArray[1], 10));
          break;

        case 'dec':
          dec(parseInt(splitArray[1], 10));
          setRegistradorAtual(parseInt(splitArray[1], 10));
          break;

        case 'set':
          set(parseInt(splitArray[1], 10), parseInt(splitArray[2], 10));
          setRegistradorAtual(parseInt(splitArray[1], 10));
          break;

        case 'set0':
          set0(parseInt(splitArray[1], 10));
          setRegistradorAtual(parseInt(splitArray[1], 10));
          break;

        case 'add':
          add(parseInt(splitArray[1], 10), parseInt(splitArray[2], 10));
          setRegistradorAtual(parseInt(splitArray[1], 10));
          break;

        case 'goto':
          const pos = goto(splitArray[1]);
          setLinhaAtual(pos);
          i = pos;
          break;


        case 'while':
          if (splitArray[1] === 'is0') {
            if (not0(parseInt(splitArray[2], 10))) {
              i = loopEnd(i);
              setLinhaAtual(i);
            }
            break;
          }

          if (splitArray[1] === 'not0') {
            if (is0(parseInt(splitArray[2], 10))) {
              i = loopEnd(i);
              setLinhaAtual(i);
            }
          }
          break;

        case 'endwhile':
          i = loopStart(i);
          setLinhaAtual(i);
          break;

        case 'for':
          if (splitArray[1] === 'is0') {
            if (not0(parseInt(splitArray[2], 10))) {
              i = loopEnd(i);
              setLinhaAtual(i);
            }
            break;
          }

          if (splitArray[1] === 'not0') {
            if (is0(parseInt(splitArray[2], 10))) {
              i = loopEnd(i);
              setLinhaAtual(i);
            }
          }
          break;

        case 'endfor':
          i = loopStart(i);
          setLinhaAtual(i);
          const incOrDec = linhasArray[i + 1].split(' ');
          if (incOrDec[3] === 'inc') {
            inc(parseInt(incOrDec[2], 10));
            break;
          }
          dec(parseInt(incOrDec[2], 10));
          break;

        case 'if':
          const destination = getIfElseDestinations(i);
          if (splitArray[1] === 'is0') {

            if (not0(parseInt(splitArray[2], 10))) {

              if (destination.elseLine) {
                i = destination.elseLine;
                setLinhaAtual(i);
              } else {
                i = destination.endLine;
                setLinhaAtual(i);
              }

            }
            break;
          }

          if (splitArray[1] === 'not0') {
            if (is0(parseInt(splitArray[2], 10))) {

              if (destination.elseLine) {
                i = destination.elseLine;
                setLinhaAtual(i);
              } else {
                i = destination.endLine;
                setLinhaAtual(i);
              }
            }
          }

          break;

        case 'else':
          i = loopEnd(i);
          setLinhaAtual(i);
          break;
      }

      await delay(500);
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
  setRegistrador(target, getRegistrador(target) + 1);
  addOperacao('inc ' + target);
}

function dec(target: number): void {
  if (getRegistrador(target) > 0) {
    setRegistrador(target, getRegistrador(target) - 1);
  }
  addOperacao('dec ' + target);
}

function set0(target: number): void {
  setRegistrador(target, 0);
  addOperacao('set0 ' + target);
}

function is0(target: number): boolean {
  return getRegistrador(target) === 0;
}

function not0(target: number): boolean {
  return getRegistrador(target) !== 0;
}

function set(target: number, source: number): void {
  setRegistrador(target, getRegistrador(source));
  addOperacao('set ' + target + ' ' + source);
}

function add(target: number, source: number): void {
  setRegistrador(target, getRegistrador(target) + getRegistrador(source));
  addOperacao('add ' + target + ' ' + source);
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
