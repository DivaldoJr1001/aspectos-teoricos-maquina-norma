import { delay } from './delay.util';
import {
  getStopped, setExecuting, setExecutionComplete,
  setLinhaAtual, setRegistradorAtual, setStopped
} from './norma-global-objects.util';

export async function runMachine(linhasArray: string[], registradoresArray: number[]): Promise<void> {
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
