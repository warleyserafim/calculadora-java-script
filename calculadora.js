'use strict';

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

//Variavel que verifica se e um numero novo;
let novoNumero = true;
//Variavel para guardar o operador;
let operador;
//Variavel para guardar o numero anterior;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

//Variavel para fazer o calculo;
const calcular = () => {
    if (operacaoPendente()) {
       const numeroAtual = parseFloat(display.textContent.replace(',', '.'));
       novoNumero = true;
       const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
       atualizaDisplay(resultado);
    //    if (operador == '+') {
    //        atualizaDisplay(numeroAnterior + numeroAtual);
    //    } else if (operador == '-') {
    //        atualizaDisplay(numeroAnterior - numeroAtual);    
    //    } else if (operador == '*'){
    //        atualizaDisplay(numeroAnterior * numeroAtual);
    //    } else if (operador == '/') {
    //        atualizaDisplay(numeroAnterior / numeroAtual);
    //    }
    }
}


//Metodo para atualizar display
const atualizaDisplay = (texto) => {
    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');
        novoNumero = false;
    } else {
    display.textContent += texto.toLocaleString('BR');
    }
}

//Metodo para inserir numero no display;
const inserirNumero = (evento) => atualizaDisplay(evento.target.textContent);
numeros.forEach (numero => numero.addEventListener('click',inserirNumero));

//Metodo para linpar o display e guardar o numero ao clicar no operador;
const selecionarOperador = (evento) => {
    if (!novoNumero) {
    calcular();
    novoNumero = true;
    operador = evento.target.textContent;
    numeroAnterior = parseFloat(display.textContent.replace(',', '.'));
    console.log(operador);
    }
}
operadores.forEach (operador => operador.addEventListener('click',selecionarOperador));

//Metodo para Ativar o Botao de Igual;
const ativarIgual = () => {
    calcular();
    operador = undefined;
}
document.getElementById('igual').addEventListener('click', ativarIgual);

//Metodo para limpar Display mantendo o Operador "CE";
const limparDisplay = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

//Metodo para limpar zerar o display "C";
const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
} 
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);


const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);


const inverterSinal = () => {
    novoNumero = true;
    atualizaDisplay (display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal)

const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()) {
        if(existeValor()){
            atualizaDisplay(',');            
        } else {
            atualizaDisplay('0,');
        }
    }
}
document.getElementById('decimal').addEventListener('click', inserirDecimal)


const mapaTeclado = {

    '0'         :   'tecla0',
    '1'         :   'tecla1',
    '2'         :   'tecla2',
    '3'         :   'tecla3',
    '4'         :   'tecla4',
    '5'         :   'tecla5',
    '6'         :   'tecla6',
    '7'         :   'tecla7',
    '8'         :   'tecla8',
    '9'         :   'tecla9',
    '-'         :   'operadorSubtrair',
    '+'         :   'operadorAdicionar',
    '/'         :   'operadorDividit',
    '*'         :   'operadorMultiplicar',
    '='         :   'igual',
    'Enter'     :   'igual',
    'Backspace' :   'backspace',
    'c'         :   'limparDisplay',
    'Escap'     :   'limparCalculo',
    ','         :   'decimal',
    
}

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();

}
document.addEventListener('keydown', mapearTeclado);