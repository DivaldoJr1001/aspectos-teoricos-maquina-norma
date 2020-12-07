import { delay } from './delay.util';
import {
  getEndToStartDestination,
  getGoToDestination,
  getIfElseDestinations,
  getStartToEndDestination,
  getStopped, setExecuting, setExecutionComplete,
  setLinhaAtual, setRegistradorAtual, setStopped
} from './norma-global-objects.util';

let registradoresArray: number[];

export async function runMachine(linhasArray: string[], registradores: number[]): Promise<void> {
  registradoresArray = registradores;
  setExecuting(true);

  for (let i = 0; i < linhasArray.length; i++) {
    const lineParts = linhasArray[i].split(' ');
    // Ignora comentários e rótulos de navegação
    if (lineParts[0].charAt(0) !== '#' && lineParts[0].charAt(0) !== ':') {
      setLinhaAtual(i);

      const splitArray = linhasArray[i].split(" ");

      switch (splitArray[0]) {
        case "inc":
          inc(parseInt(splitArray[1]));
          setRegistradorAtual(parseInt(splitArray[1]));
          break;

        case "dec":
          dec(parseInt(splitArray[1]));
          setRegistradorAtual(parseInt(splitArray[1]));
          break;

        case "set":
          set(parseInt(splitArray[1]), parseInt(splitArray[2]));
          setRegistradorAtual(parseInt(splitArray[1]));
          break;

        case "set0":
          set0(parseInt(splitArray[1]));
          setRegistradorAtual(parseInt(splitArray[1]));
          break;

        case "add":
          add(parseInt(splitArray[1]), parseInt(splitArray[2]));
          setRegistradorAtual(parseInt(splitArray[1]));
          break;

        case "goto":
          let pos = goto(splitArray[1]);
          setLinhaAtual(pos);
          i = pos;
          break;

        case "else":
          i = loopEnd(i);
          setLinhaAtual(i);
         break;

        case "while":
          if (splitArray[1] == "is0") {
            if (not0(parseInt(splitArray[2]))) {
              i = loopEnd(i);
              setLinhaAtual(i);
            }
            break;
          }

          if (splitArray[1] == "not0") {
            if (is0(parseInt(splitArray[2]))) {
              i = loopEnd(i);
              setLinhaAtual(i);
            }
          }
        break;

        case "endwhile":
          i = loopStart(i);
          setLinhaAtual(i);
        break;

        case "for":
          if (splitArray[1] == "is0") {
            if (not0(parseInt(splitArray[2]))) {
              i = loopEnd(i);
              setLinhaAtual(i);
            }
            break;
          }

          if (splitArray[1] == "not0") {
            if (is0(parseInt(splitArray[2]))) {
              i = loopEnd(i);
              setLinhaAtual(i);
            }
          }
        break;

        case "endfor":
          i = loopStart(i);
          setLinhaAtual(i);
          const incOrDec = linhasArray[i+1].split(" ");
          if(incOrDec[3] == "inc"){
            inc(parseInt(incOrDec[2]));
            break;
          }
          dec(parseInt(incOrDec[2]));
        break;

        case "if":
          const destination = getIfElseDestinations(i);
          if (splitArray[1] == "is0") {

            if (not0(parseInt(splitArray[2]))) {

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

          if (splitArray[1] == "not0") {
            if (is0(parseInt(splitArray[2]))) {

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
      }

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
