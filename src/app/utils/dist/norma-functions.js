"use strict";
exports.__esModule = true;
exports.getGoToDestination = exports.getGoToDestinations = exports.validateCode = void 0;
var validatorStack;
var goToDestinations = {};
function validateCode(codeLinesArray) {
    validatorStack = [];
    goToDestinations = {};
    // Pegando todas as labels primeiro, retornando que o código é inválido caso haja repetição
    for (var i = 0; i < codeLinesArray.length; i++) {
        var lineParts = codeLinesArray[i].split(' ');
        if (lineParts.length === 1 && lineParts[0].charAt(0) === ':') {
            if (!goToDestinations[lineParts[0].substr(1)]) {
                goToDestinations[lineParts[0].substr(1)] = i + 1;
            }
            else {
                return false;
            }
        }
    }
    // Validando o resto do código
    for (var _i = 0, codeLinesArray_1 = codeLinesArray; _i < codeLinesArray_1.length; _i++) {
        var codeLine = codeLinesArray_1[_i];
        var lineParts = codeLine.split(' ');
        if (lineParts[0].charAt(0) !== '#') {
            switch (lineParts.length) {
                case 1:
                    switch (lineParts[0]) {
                        case 'else':
                            if (validatorStack[validatorStack.length - 1] !== 'if') {
                                return false;
                            }
                            break;
                        case 'endif':
                            if (validatorStack.pop() !== 'if') {
                                return false;
                            }
                            break;
                        case 'endwhile':
                            if (validatorStack.pop() !== 'while') {
                                return false;
                            }
                            break;
                        case 'endfor':
                            if (validatorStack.pop() !== 'for') {
                                return false;
                            }
                            break;
                        default:
                            if (!(lineParts[0].charAt(0) === ':')) {
                                return false;
                            }
                    }
                    break;
                case 2:
                    if (lineParts[0] === 'inc' || lineParts[0] === 'dec' || lineParts[0] === 'set0') {
                        if (!isValidRegister(lineParts[1])) {
                            return false;
                        }
                    }
                    else if (lineParts[0] === 'goto') {
                        if (!goToDestinations[lineParts[1]]) {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                    break;
                case 3:
                    if (lineParts[0] === 'if' || lineParts[0] === 'while') {
                        validatorStack.push(lineParts[0]);
                        if (lineParts[1] !== 'is0' && lineParts[1] !== 'not0' || !isValidRegister(lineParts[2])) {
                            return false;
                        }
                    }
                    else if (lineParts[0] === 'set' || lineParts[0] === 'add') {
                        if (!isValidRegister(lineParts[1]) || !isValidRegister(lineParts[2])) {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                    break;
                case 4:
                    if (lineParts[0] !== 'for' || lineParts[1] !== 'is0' && lineParts[1] !== 'not0' ||
                        !isValidRegister(lineParts[2]) || lineParts[3] !== 'inc' && lineParts[3] !== 'dec') {
                        return false;
                    }
                    validatorStack.push(lineParts[0]);
                    break;
                default:
                    return false;
            }
        }
    }
    if (validatorStack.length === 0) {
        return true;
    }
    return false;
}
exports.validateCode = validateCode;
function isValidRegister(reg) {
    var regNum = parseInt(reg, 10);
    if (!isNaN(regNum) && regNum >= 0 && regNum < 64) {
        return true;
    }
    return false;
}
function getGoToDestinations() {
    console.log(goToDestinations);
}
exports.getGoToDestinations = getGoToDestinations;
function getGoToDestination(label) {
    return goToDestinations[label];
}
exports.getGoToDestination = getGoToDestination;
