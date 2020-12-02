"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var norma_code_validator_util_1 = require("./utils/norma-code-validator.util");
var norma_execution_util_1 = require("./utils/norma-execution.util");
var norma_global_objects_util_1 = require("./utils/norma-global-objects.util");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'aspectos-teoricos-maquina-norma';
        this.inputCodeControl = new forms_1.FormControl('');
        this.linhasArray = [];
        this.operacoesArray = [];
        this.inputInitialValuesControl = new forms_1.FormControl('');
        this.registradoresArray = [];
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        for (var i = 0; i < 64; i++) {
            this.registradoresArray.push(0);
        }
        this.inputCodeControl.valueChanges.pipe(operators_1.debounceTime(500)).subscribe(function (inputCode) {
            _this.linhasArray = inputCode.split(/\n/).map(function (line) { return line.trim(); }).filter(function (line) { return line !== ''; });
            norma_code_validator_util_1.codeValidator(_this.linhasArray);
        });
        this.inputInitialValuesControl.valueChanges.pipe(operators_1.debounceTime(200)).subscribe(function (inputInitialValues) {
            _this.resetRegistradores();
            var inputError = false;
            var initialValues = inputInitialValues.split(' ').filter(function (value) { return value !== ''; }).map(function (value) {
                var num = parseInt(value, 10);
                if (isNaN(num)) {
                    inputError = true;
                }
                return num;
            });
            if (inputError) {
                norma_global_objects_util_1.setInitialValueValid(false);
            }
            else {
                norma_global_objects_util_1.setInitialValueValid(true);
                while (initialValues.length > 64) {
                    initialValues.pop();
                }
                for (var i = 0; i < initialValues.length; i++) {
                    _this.registradoresArray[i] = initialValues[i];
                }
            }
        });
    };
    AppComponent.prototype.getVarInputCodeValid = function () {
        return norma_global_objects_util_1.getInputCodeValid();
    };
    AppComponent.prototype.getVarInitialValueValid = function () {
        return norma_global_objects_util_1.getInitialValueValid();
    };
    AppComponent.prototype.getVarExecuting = function () {
        return norma_global_objects_util_1.getExecuting();
    };
    AppComponent.prototype.getVarExecutionComplete = function () {
        return norma_global_objects_util_1.getExecutionComplete();
    };
    AppComponent.prototype.run = function () {
        norma_execution_util_1.runMachine(this.linhasArray, this.registradoresArray);
    };
    AppComponent.prototype.stop = function () {
        norma_global_objects_util_1.setStopped(true);
    };
    AppComponent.prototype.reset = function () {
        this.resetRegistradores();
        norma_global_objects_util_1.resetVariables();
    };
    AppComponent.prototype.resetRegistradores = function () {
        this.registradoresArray = this.registradoresArray.map(function (_) { return 0; });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
