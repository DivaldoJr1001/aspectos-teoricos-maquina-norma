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
var norma_functions_1 = require("./utils/norma-functions");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'aspectos-teoricos-maquina-norma';
        this.inputCodeControl = new forms_1.FormControl('');
        this.linhasArray = [];
        this.linhaAtual = null;
        this.inputCodeValid = false;
        this.operacoesArray = [];
        this.inputInitialValuesControl = new forms_1.FormControl('');
        this.registradoresArray = [];
        this.initialValueValid = true;
        this.executionComplete = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        for (var i = 0; i < 64; i++) {
            this.registradoresArray.push(0);
        }
        this.inputCodeControl.valueChanges.pipe(operators_1.debounceTime(500)).subscribe(function (inputCode) {
            _this.linhasArray = inputCode.split(/\n/).map(function (line) { return line.trim(); }).filter(function (line) { return line !== ''; });
            _this.inputCodeValid = norma_functions_1.validateCode(_this.linhasArray);
            norma_functions_1.getGoToDestinations();
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
                _this.initialValueValid = false;
            }
            else {
                _this.initialValueValid = true;
                while (initialValues.length > 64) {
                    initialValues.pop();
                }
                for (var i = 0; i < initialValues.length; i++) {
                    _this.registradoresArray[i] = initialValues[i];
                }
            }
        });
    };
    AppComponent.prototype.inputCodeState = function (state) {
        console.log(state);
        this.inputCodeValid = state;
    };
    AppComponent.prototype.run = function () {
        this.resetRegistradores();
    };
    AppComponent.prototype.resetRegistradores = function () {
        this.registradoresArray.map(function (_) { return 0; });
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
