const valorAtual = 1250; 
const meta = 3000; 

document.addEventListener("DOMContentLoaded", () => {

    let contador = 0;
    const elemento = document.getElementById("contador");

    const animacao = setInterval(() => {

        contador += Math.ceil(valorAtual / 80);

        if (contador >= valorAtual) {
            contador = valorAtual;
            clearInterval(animacao);
        }

        elemento.innerText =
            contador.toLocaleString("pt-BR");

    }, 20);

    const porcentagem = (valorAtual / meta) * 100;

    document.getElementById("barra").style.width =
        porcentagem + "%";

});
let valorSelecionado = 0;

function selecionarValor(valor){
    valorSelecionado = valor;

    alert(`💛 Você escolheu contribuir com R$${valor}.
Clique em "Quero ajudar" para continuar.`);
}

function irParaPagamento(){

    window.open("https://nubank.com.br/cobrar/17dl27/69a48122-a633-4095-9844-337c3d803ca7", "_blank");

    setTimeout(() => {
        window.location.href = "obrigado.html";
    }, 3000);
}

function criarCoracao(){

    const area = document.querySelector(".coracoes");
    if(!area) return; // só roda na página obrigado

    const coracao = document.createElement("div");

    coracao.classList.add("coracao");
    coracao.innerHTML = "❤️";

    coracao.style.left = Math.random() * 100 + "vw";
    coracao.style.animationDuration = (4 + Math.random() * 3) + "s";

    area.appendChild(coracao);

    setTimeout(()=>{
        coracao.remove();
    },7000);
}

/* cria vários corações ao abrir */
setInterval(criarCoracao, 400);