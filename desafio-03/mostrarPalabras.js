const mostrarPalabras = (param, callback, tiempo) => {
    let i = 0;
    let idInterval = setInterval(
        ()=>{
            console.log(param[i++]);
            if (i == param.length) {
                let cantidad = param.length;
                clearInterval(idInterval);
                callback(cantidad);
            }
        },
        tiempo ?? 1000
    )
}

// VARIABLES TEXTOS

const texto1 = "Hola como estas?";
const texto2 = "Todo bien y vos?";
const texto3 = "Bien bien, aca tomando unos mates.";

const fin = () => console.log('Proceso completo');

mostrarPalabras(texto1.split(" "), (cantidad)=> {
    let nuevaCantidad = cantidad;
    mostrarPalabras(texto2.split(" "), (cantidad) => {
        nuevaCantidad = nuevaCantidad + cantidad;
        mostrarPalabras(texto3.split(" "), (cantidad)=> {
            let cantidadTotal = nuevaCantidad + cantidad;
            console.log(`Proceso completo. Cantidad total de palabras: ${cantidadTotal}`);
        })
        }, 200)
    }, 100)


    

