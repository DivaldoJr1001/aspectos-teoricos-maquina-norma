"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListaCodigoLinhasComponent = void 0;
var core_1 = require("@angular/core");
var norma_global_objects_util_1 = require("../utils/norma-global-objects.util");
var ListaCodigoLinhasComponent = /** @class */ (function () {
    function ListaCodigoLinhasComponent() {
        this.linhasArray = [];
    }
    ListaCodigoLinhasComponent.prototype.ngOnInit = function () {
    };
    ListaCodigoLinhasComponent.prototype.getVarLinhaAtual = function () {
        return norma_global_objects_util_1.getLinhaAtual();
    };
    ListaCodigoLinhasComponent.prototype.getVarInputCodeValid = function () {
        return norma_global_objects_util_1.getInputCodeValid();
    };
    __decorate([
        core_1.Input()
    ], ListaCodigoLinhasComponent.prototype, "linhasArray");
    ListaCodigoLinhasComponent = __decorate([
        core_1.Component({
            selector: 'app-lista-codigo-linhas',
            templateUrl: './lista-codigo-linhas.component.html',
            styleUrls: ['./lista-codigo-linhas.component.scss']
        })
    ], ListaCodigoLinhasComponent);
    return ListaCodigoLinhasComponent;
}());
exports.ListaCodigoLinhasComponent = ListaCodigoLinhasComponent;
