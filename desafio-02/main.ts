
function operacion(a: number, b: number, operacion: string) {
    return new Promise(async resolve => {

        if (operacion == "suma"){
            const sum = await import("./suma");
            resolve(new sum.Suma(a, b).resultado());
    }

    else if (operacion == "resta"){ 
        const res = await import("./resta");
        resolve(new res.Resta(a, b).resultado());
            }
    })

}

// ejecuto pasando los operandos y el tipo de operacion
function operaciones() {
    operacion(20,5, 'suma').then(resultado => console.log('El resultado de tu operacion es: ', resultado));
    operacion(20,5, 'resta').then(resultado => console.log('El resultado de tu operacion es: ', resultado));
}

operaciones();