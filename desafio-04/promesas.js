// DECLARO PROMESAS

const promesaUno = new Promise((resolve, reject) => {
    let azar = Math.random();
    setTimeout(() => azar > 0.2 ? resolve(azar) : reject("Hubo un error"),
    3000)
});

const promesaDos = new Promise((resolve, reject) => {
    let azar = Math.random();
    setTimeout(() => azar > 0.2 ? resolve(azar) : reject("Hubo un error"),
    2000)
});

const promesaTres = new Promise((resolve, reject) => {
    let azar = Math.random();
    setTimeout(() => azar > 0.2 ? resolve(azar) : reject("Hubo un error"),
    5000)
});

const promesaCuatro = new Promise((resolve, reject) => {
    let azar = Math.random();
    setTimeout(() => azar > 0.2 ? resolve(azar) : reject("Hubo un error"),
    1000)
});

const promesaCinco = new Promise((resolve, reject) => {
    let azar = Math.random();
    setTimeout(() => azar > 0.2 ? resolve(azar) : reject("Hubo un error"),
    4000)
});


// PROGRAMA

console.log('iniciando...');

// GENERADORA

function *numAleatorios(){
    let contador = 0;
    while (contador < 26) {
        yield {
            indice: contador++,
            num: Math.random()
        }
    }
}

let generadora = numAleatorios();

for (num of generadora){
    console.log(generadora.next().value.num);
}

// CUMPLIENDO PROMESAS

promesaUno
    .then(resultado => console.log("Que bien: ", resultado))
    .catch(error => console.log("Que mal: ", error))
    .finally(() => console.log("Nuevo numero: ",numAleatorios().next().value.num));

promesaDos
    .then(resultado => console.log("Que bien: ", resultado))
    .catch(error => console.log("Que mal: ", error))
    .finally(() => console.log("Nuevo numero: ",numAleatorios().next().value.num));

promesaTres
    .then(resultado => console.log("Que bien: ", resultado))
    .catch(error => console.log("Que mal: ", error))
    .finally(() => console.log("Nuevo numero: ",numAleatorios().next().value.num));

promesaCuatro
    .then(resultado => console.log("Que bien: ", resultado))
    .catch(error => console.log("Que mal: ", error))
    .finally(() => console.log("Nuevo numero: ", numAleatorios().next().value.num));

promesaCinco
    .then(resultado => console.log("Que bien: ", resultado))
    .catch(error => console.log("Que mal: ", error))
    .finally(() => console.log("Nuevo numero: ",numAleatorios().next().value.num));
    

