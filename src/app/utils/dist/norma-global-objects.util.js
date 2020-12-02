"use strict";
exports.__esModule = true;
exports.resetVariables = exports.getExecutionComplete = exports.setExecutionComplete = exports.getStopped = exports.setStopped = exports.getExecuting = exports.setExecuting = exports.getInitialValueValid = exports.setInitialValueValid = exports.getInputCodeValid = exports.setInputCodeValid = exports.getRegistradorAtual = exports.setRegistradorAtual = exports.getLinhaAtual = exports.setLinhaAtual = exports.getStartToEndDestination = exports.getEndToStartDestination = exports.addLoopDestinations = exports.resetStartEndDestinations = exports.getGoToDestination = exports.addGoToDestinations = exports.resetGoToDestinations = void 0;
var goToDestinations = {};
var endToStartDestinations = {};
var startToEndDestinations = {};
var linhaAtual = null;
var registradorAtual = null;
var inputCodeValid = false;
var initialValueValid = true;
var executing = false;
var stopped = false;
var executionComplete = false;
function resetGoToDestinations() {
    goToDestinations = {};
}
exports.resetGoToDestinations = resetGoToDestinations;
function addGoToDestinations(label, linha) {
    goToDestinations[label] = linha;
}
exports.addGoToDestinations = addGoToDestinations;
function getGoToDestination(label) {
    return goToDestinations[label];
}
exports.getGoToDestination = getGoToDestination;
function resetStartEndDestinations() {
    startToEndDestinations = {};
    endToStartDestinations = {};
}
exports.resetStartEndDestinations = resetStartEndDestinations;
function addLoopDestinations(start, end) {
    startToEndDestinations[start] = end;
    endToStartDestinations[end] = start - 1;
}
exports.addLoopDestinations = addLoopDestinations;
function getEndToStartDestination(linha) {
    return endToStartDestinations[linha];
}
exports.getEndToStartDestination = getEndToStartDestination;
function getStartToEndDestination(linha) {
    return startToEndDestinations[linha];
}
exports.getStartToEndDestination = getStartToEndDestination;
function setLinhaAtual(linha) {
    linhaAtual = linha;
}
exports.setLinhaAtual = setLinhaAtual;
function getLinhaAtual() {
    return linhaAtual;
}
exports.getLinhaAtual = getLinhaAtual;
function setRegistradorAtual(registrador) {
    registradorAtual = registrador;
}
exports.setRegistradorAtual = setRegistradorAtual;
function getRegistradorAtual() {
    return registradorAtual;
}
exports.getRegistradorAtual = getRegistradorAtual;
function setInputCodeValid(validity) {
    inputCodeValid = validity;
}
exports.setInputCodeValid = setInputCodeValid;
function getInputCodeValid() {
    return inputCodeValid;
}
exports.getInputCodeValid = getInputCodeValid;
function setInitialValueValid(validity) {
    initialValueValid = validity;
}
exports.setInitialValueValid = setInitialValueValid;
function getInitialValueValid() {
    return initialValueValid;
}
exports.getInitialValueValid = getInitialValueValid;
function setExecuting(validity) {
    executing = validity;
}
exports.setExecuting = setExecuting;
function getExecuting() {
    return executing;
}
exports.getExecuting = getExecuting;
function setStopped(validity) {
    stopped = validity;
}
exports.setStopped = setStopped;
function getStopped() {
    return stopped;
}
exports.getStopped = getStopped;
function setExecutionComplete(validity) {
    executionComplete = validity;
}
exports.setExecutionComplete = setExecutionComplete;
function getExecutionComplete() {
    return executionComplete;
}
exports.getExecutionComplete = getExecutionComplete;
function resetVariables() {
    executionComplete = false;
    linhaAtual = null;
    registradorAtual = null;
}
exports.resetVariables = resetVariables;
