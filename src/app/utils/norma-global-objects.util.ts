let goToDestinations: { [key: string]: number } = {};
let endToStartDestinations: { [key: number]: number } = {};
let startToEndDestinations: { [key: number]: number } = {};

let linhaAtual: number | null = null;
let registradorAtual: number | null = null;

let inputCodeValid = false;
let initialValueValid = true;

let executing = false;
let stopped = false;
let executionComplete = false;

export function resetGoToDestinations(): void {
  goToDestinations = {};
}

export function addGoToDestinations(label: string, linha: number): void {
  goToDestinations[label] = linha;
}

export function getGoToDestination(label: string): number {
  return goToDestinations[label];
}

export function resetStartEndDestinations(): void {
  startToEndDestinations = {};
  endToStartDestinations = {};
}

export function addLoopDestinations(start: number, end: number): void {
  startToEndDestinations[start] = end;
  endToStartDestinations[end] = start - 1;
}

export function getEndToStartDestination(linha: number): number {
  return endToStartDestinations[linha];
}

export function getStartToEndDestination(linha: number): number {
  return startToEndDestinations[linha];
}

export function setLinhaAtual(linha: number | null): void {
  linhaAtual = linha;
}

export function getLinhaAtual(): number | null {
  return linhaAtual;
}

export function setRegistradorAtual(registrador: number | null): void {
  registradorAtual = registrador;
}

export function getRegistradorAtual(): number | null {
  return registradorAtual;
}

export function setInputCodeValid(validity: boolean): void {
  inputCodeValid = validity;
}

export function getInputCodeValid(): boolean {
  return inputCodeValid;
}

export function setInitialValueValid(validity: boolean): void {
  initialValueValid = validity;
}

export function getInitialValueValid(): boolean {
  return initialValueValid;
}

export function setExecuting(validity: boolean): void {
  executing = validity;
}

export function getExecuting(): boolean {
  return executing;
}

export function setStopped(validity: boolean): void {
  stopped = validity;
}

export function getStopped(): boolean {
  return stopped;
}

export function setExecutionComplete(validity: boolean): void {
  executionComplete = validity;
}

export function getExecutionComplete(): boolean {
  return executionComplete;
}

export function resetVariables(): void {
  executionComplete = false;
  linhaAtual = null;
  registradorAtual = null;
}
