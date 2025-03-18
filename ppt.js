let escolhas = ["Pedra","Papel","Tesoura"];
let result4 = document.getElementById('result04');
let resultPc = document.getElementById('resultPc');

document.getElementById('btnJ1').addEventListener('click', function() {
    let saida = escolhaMaquina();
    let resultado = logica(saida,"Pedra");
    resultPc.innerHTML = "CPU escolheu "+saida;
    result4.innerHTML = resultado
});

document.getElementById('btnJ2').addEventListener('click', function() {
    let saida = escolhaMaquina();
    let resultado = logica(saida,"Papel");
    resultPc.innerHTML = "CPU escolheu "+saida;
    result4.innerHTML = resultado
});

document.getElementById('btnJ3').addEventListener('click', function() {
    let saida = escolhaMaquina();
    let resultado = logica(saida,"Tesoura");
    resultPc.innerHTML = "CPU escolheu "+saida;
    result4.innerHTML = resultado 
});

function escolhaMaquina() {
    var escolha = escolhas[Math.floor(Math.random() * escolhas.length)];
    console.log(escolha);
    return escolha;
}

function logica(maquina,usuario){
    if (usuario === maquina) {
        return "Empate!";
    } else if (
        (usuario === "Pedra" && maquina === "Tesoura") ||
        (usuario === "Tesoura" && maquina === "Papel") ||
        (usuario === "Papel" && maquina === "Pedra")
    ) {
        return "Você venceu!";
    } else {
        return "Você perdeu!";
    }

}