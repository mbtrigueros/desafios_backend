"use strict";
exports.__esModule = true;
exports.Resta = void 0;
var Resta = /** @class */ (function () {
    function Resta(a, b) {
        this.a = 0;
        this.b = 0;
        this.a = a;
        this.b = b;
    }
    Resta.prototype.resultado = function () {
        return this.a - this.b;
    };
    return Resta;
}());
exports.Resta = Resta;
