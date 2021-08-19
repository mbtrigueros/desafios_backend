const mostrarPalabras = (param, callback, tiempo) => {
    let i = 0;
    let idInterval = setInterval(
        ()=>{
            console.log(param[i++]);
            if (i == param.length) {
                console.log(`Palabras totales: ${param.length}`);
                clearInterval(idInterval);
                callback();
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

mostrarPalabras(texto1.split(" "), ()=> {
    mostrarPalabras(texto2.split(" "), () => {
        mostrarPalabras(texto3.split(" "), fin)
        }, 200)
    }, 3000)


    

