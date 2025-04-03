const { createServer } = require('node:http');
const { URL } = require('node:url');

const hostname = '127.0.0.1';
const port = 3000;
let counter = 0

function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}
async function precoBrl() {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl');
    const data = await response.json();
    console.log(data);
    return data;
}
async function precoUsd() {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const data = await response.json();
    console.log(data);
    return data;
}


function compra(moeda, preco) {
    if (moeda == 'brl') {
        if (preco < 300000) {
            return 'Bom momento para compra!'
        } else if (preco >= 300000 && preco <= 450000) {
            return 'Preço está razoável, Avalie antes de comprar'
        } else if (preco > 450000) {
            return 'Bitcoin está caro. Pode ser melhor esperar.'
        }

    } else if (moeda == 'usd') {
        if (preco < 60000) {
            return 'Bom momento para compra!'
        } else if (preco >= 60000 && preco <= 80000) {
            return 'Preço está razoável, Avalie antes de comprar'
        } else if (preco > 80000) {
            return 'Bitcoin está caro. Pode ser melhor esperar.'
        }

    }
}


const server = createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    try {
        const url = new URL(request.url, `http://${hostname}:${port}`);

        if (request.method === 'GET' && url.pathname === '/health-check') {
            response.statusCode = 200;
            response.end(JSON.stringify({ success: true, timestamp: new Date().toISOString() }));


        } else if (request.method === 'GET' && url.pathname == '/is-prime-number') {
            const number = parseInt(url.searchParams.get('number'));

            if (isNaN(number)) {
                response.statusCode = 400;
                response.end(JSON.stringify({ success: false, message: 'Invalid number' }));
                return
            }
            response.statusCode = 200;
            response.end(JSON.stringify({ success: true, isPrime: isPrime(number) }));

        } else if (request.method === 'GET' && url.pathname === '/mercado') {
            const moeda = url.searchParams.get('moeda');
            console.log(moeda);

            if (moeda == 'brl' || moeda == 'usd' || moeda == 'brl,usd') {
                if (moeda == 'brl') {
                    (async () => {
                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'application/json');
                        const precoFinalBr = await precoBrl();
                        const precoFinal = precoFinalBr.bitcoin.brl;
                        sugestao = compra('brl', precoFinal);
                        response.end(JSON.stringify({ btc_price: precoFinal, currency: "brl", sugestao: sugestao }));


                    })();
                } else if (moeda == 'usd') {
                    (async () => {
                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'application/json');
                        const precoFinalUs = await precoUsd();
                        const precoFinal = precoFinalUs.bitcoin.usd;
                        sugestao = compra('usd', precoFinal);
                        response.end(JSON.stringify({ btc_price: precoFinal, currency: "usd", sugestao: sugestao }));


                    })();
                } else if (moeda == 'brl,usd') {
                    (async () => {
                        response.statusCode = 200;
                        response.setHeader('Content-Type', 'application/json');
                        const precoFinalBr = await precoBrl();
                        const precoFinalUs = await precoUsd();

                        const precoBr = precoFinalBr.bitcoin.brl;
                        const precoUs = precoFinalUs.bitcoin.usd;

                        sugestao = compra('usd', precoUs);

                        response.end(JSON.stringify({ btc_price_Usd: precoUs, btc_price_Brl: precoBr, currency: moeda, sugestao: sugestao }));


                    })();
                }
            } else {
                response.statusCode = 404;
                console.log("naop encontrado")
                response.end(JSON.stringify({ aviso: "moeda não encontrada" }));
            }




        } else if (request.method === 'POST' && url.pathname == '/count') {
            let body = '';

            request.on('data', chunk => { body += chunk.toString(); });
            request.on('end', () => {
                try {
                    const parsedBody = JSON.parse(body);

                    if (typeof parsedBody.incrementBy !== 'number' || parsedBody.incrementBy <= 0) {
                        response.statusCode = 400;
                        response.end(JSON.stringify({ error: "Invalid input" }));
                        return;
                    }

                    counter += parsedBody.incrementBy;
                    response.statusCode = 200;
                    response.end(JSON.stringify({ counter }));

                } catch (error) {
                    response.statusCode = 400;
                    response.end(JSON.stringify({ error: "Invalid JSON body" }));
                }
            });

        } else {
            response.statusCode = 404;
            console.log('veio aqui')
            response.end(JSON.stringify({ error: 'Route not found' }));
        }
    } catch (error) {
        console.error(error)
        response.statusCode = 500;
        response.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
});

server.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}/`);
});