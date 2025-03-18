let input;
let saida = document.getElementById("result");

document.getElementById('btn02').addEventListener('click', function () {
    input = parseInt(document.getElementById('input').value);
    primo(input)
    console.log(input);
})

function primo(n) {
    if (!Number.isInteger(n) || n < 0 || typeof n !== "number") {
        saida.innerHTML = "Erro: Número inválido";
        return
    }
    if (n < 2) {
        saida.innerHTML = "Número primo não pode ser menor que 2";
        return
    }
    if (n === 2) {
        saida.innerHTML = "É PRIMO!";
        return
    }
    if (n % 2 == 0) {
        saida.innerHTML = "Não é primo";
        return
    }
    const limite = Math.sqrt(n);
    console.log("raiz; " + limite);
    for (let i = 3; i <= limite; i += 2) {
        if (n % i == 0) {
            saida.innerHTML = "Não é primo";
            console.log("divisor encontrado");
            return
        }

    }
    saida.innerHTML = "É PRIMO!";

}