let texto,inverso,limpo;
let saidaa = document.getElementById('result03')

document.getElementById('dromo').addEventListener('click', function() {

    texto = document.getElementById('palin').value;
    console.log(texto)

    limpo = texto.replace(/\s/g, '');
    limpo = limpo.toLowerCase();
    limpo = limpo.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    inverso = limpo.split('').reverse().join('');

    console.log(limpo)
    console.log("-"+inverso)

    if(limpo==inverso){
        result03.innerHTML = "TRUE";
    }else{
        result03.innerHTML = "FALSE";
    }
})