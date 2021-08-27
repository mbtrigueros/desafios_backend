"use strict";
exports.__esModule = true;
exports.Suma = void 0;
var Suma = /** @class */ (function () {
    function Suma(a, b) {
        this.a = 0;
        this.b = 0;
        this.a = a;
        this.b = b;
    }
    Suma.prototype.resultado = function () {
        return this.a + this.b;
    };
    return Suma;
}());
exports.Suma = Suma;
