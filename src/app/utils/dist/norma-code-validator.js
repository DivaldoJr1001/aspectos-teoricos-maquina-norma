"use strict";
exports.__esModule = true;
exports.validateCode = exports.codeValidator = void 0;
var norma_global_objects_1 = require("./norma-global-objects");
var validatorStack;
function codeValidator(codeLinesArray) {
    norma_global_objects_1.setInputCodeValid(validateCode(codeLinesArray));
}
exports.codeValidator = codeValidator;
function validateCode(codeLinesArray) {
    validatorStack = [];
    norma_global_objects_1.resetGoToDestinations();
    norma_global_objects_1.resetStartEndDestinations();
    // Pegando todas as labels primeiro, retornando que o código é inválido caso haja repetição
    for (var i = 0; i < codeLinesArray.length; i++) {
        var lineParts = codeLinesArray[i].split(' ');
        if (lineParts.length === 1 && lineParts[0].charAt(0) === ':') {
            if (!norma_global_objects_1.getGoToDestination(lineParts[0].substr(1))) {
                norma_global_objects_1.addGoToDestinations(lineParts[0].substr(1), i + 1);
            }
            else {
                return false;
            }
        }
    }
    // Validando o resto do código
    for (var i = 0; i < codeLinesArray.length; i++) {
        var lineParts = codeLinesArray[i].split(' ');
        var latestStack = void 0;
        if (lineParts[0].charAt(0) !== '#') {
            switch (lineParts.length) {
                case 1:
                    switch (lineParts[0]) {
                        case 'else':
                            if (validatorStack[validatorStack.length - 1].command !== 'if') {
                                return false;
                            }
                            break;
                        case 'endif':
                            latestStack = validatorStack.pop();
                            if (latestStack.command !== 'if') {
                                return false;
                            }
                            norma_global_objects_1.addStartEndDestinations(latestStack.line, i);
                            break;
                        case 'endwhile':
                            latestStack = validatorStack.pop();
                            if (latestStack.command !== 'while') {
                                return false;
                            }
                            norma_global_objects_1.addStartEndDestinations(latestStack.line, i);
                            break;
                        case 'endfor':
                            latestStack = validatorStack.pop();
                            if (latestStack.command !== 'for') {
                                return false;
                            }
                            norma_global_objects_1.addStartEndDestinations(latestStack.line, i);
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
                        if (!norma_global_objects_1.getGoToDestination(lineParts[1])) {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                    break;
                case 3:
                    if (lineParts[0] === 'if' || lineParts[0] === 'while') {
                        validatorStack.push({
                            command: lineParts[0],
                            line: i
                        });
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
                    validatorStack.push({
                        command: lineParts[0],
                        line: i
                    });
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
