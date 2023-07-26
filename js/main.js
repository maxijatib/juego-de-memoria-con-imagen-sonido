//inicializacion de variables

let tarjetasDestapadas = 0;

let tarjeta1 = null;
let tarjeta2 = null;

let primerResultado = null;
let segundoResultado = null;

let movimientos = 0;

let aciertos = 0;

let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;

//apuntando a documento HTML

let mostrarMovimientos = document.getElementById('movimientos');

let mostrarAciertos = document.getElementById('aciertos');

let mostrarTiempo = document.getElementById('t-restante');

// audios

let winAudio = new Audio("./assets/sounds/win.wav");
let loseAudio = new Audio("./assets/sounds/lose.wav");
let clickAudio = new Audio("./assets/sounds/click.wav");
let rightAudio = new Audio("./assets/sounds/right.wav");
let wrongAudio = new Audio("./assets/sounds/wrong.wav");

//generacion de numeros aleatorios

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

numeros = numeros.sort(()=>{return Math.random() - 0.5});

console.log(numeros);

//funciones

function contarTiempo() {

    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

        if(timer == 0) {

            clearInterval(tiempoRegresivoId);

            bloquearTarjetas();

            loseAudio.play();

        }

    }, 1000);

}

function bloquearTarjetas() {

    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./assets/img/${numeros[i]}.png" alt"">`;
        tarjetaBloqueada.disabled = true;
    }

}

//funcion principal

function destapar(id) {

    if (temporizador == false) {

        contarTiempo();
        temporizador = true;

    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1) {
        //mostrar primer numero

        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./assets/img/${primerResultado}.png" alt"">`;
        clickAudio.play();

        //desahabilitar primer boton

        tarjeta1.disabled = true;

    } else if (tarjetasDestapadas == 2) {

        //mostrar segundo numero

        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./assets/img/${segundoResultado}.png" alt"">`;        

        //deshabilitar segundo boton

        tarjeta2.disabled = true;

        //incrementar movimientos

        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {

            //encerar contador tarjetas destapadas

            tarjetasDestapadas = 0;

            //aumentar aciertos

            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            rightAudio.play();

            if(aciertos == 8) {

                clearInterval(tiempoRegresivoId);

                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`;

                mostrarTiempo.innerHTML = `Fantástico! 🎉 solo demoraste ${timerInicial - timer} segundos. `;

                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 😎`;

                winAudio.play();

            }

        } else {

            //mostrar momentaneamente valores y volver a tapar

            setTimeout(() => {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);

            wrongAudio.play();

        }

    }

}