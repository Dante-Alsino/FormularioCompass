let array = [];
let input1,numero,total;
let result = document.getElementById("result01");

document.getElementById('btn01').addEventListener('click', function () {
    array = [];
    total = 0;

    input1 = parseInt(document.getElementById('soma').value);
    console.log(input1)

    for (let i = 1; i <= input1; i++) {
        numero = parseInt(prompt(i + "° -> Digite um número"));
        array.push(numero);
    }
    console.log({ array })
    somas(array);
})

function somas(array) {
    const arrayLimite = array.length
    for (let j = 0; j < arrayLimite; j++) {
        total += array[j];
        console.log("resulta parcial:" + total);
    }
    console.log("resulta final:" + total);
    result.innerHTML= "Resultado: "+total;
}