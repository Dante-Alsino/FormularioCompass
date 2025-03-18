let input;
let saida = document.getElementById("result");

document.getElementById('btn02').addEventListener('click', function () {
    input = parseInt(document.getElementById('input').value);
    primo(input)
    console.log(input);
})

function primo(n) {
    if (n < 0) {
        saida.innerHTML = "valor invalido detectado";
        return
    }
    if (n < 2) {
        saida.innerHTML = "False";
        return
    }
    if (n === 2) {
        saida.innerHTML = "True";
        return
    }
    if (n % 2 == 0) {
        saida.innerHTML = "False";
        return
    }
    const limite = Math.sqrt(n);
    console.log("Raiz: " + limite);
    for (let i = 3; i <= limite; i += 2) {
        if (n % i == 0) {
            saida.innerHTML = "False";
            console.log("divisor encontrado");
            return
        }

    }
    saida.innerHTML = "True";

}