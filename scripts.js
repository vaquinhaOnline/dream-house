const meta = 3000;

let valorAtual = localStorage.getItem("valorArrecadado");

if(!valorAtual){
    valorAtual = 0;
}else{
    valorAtual = Number(valorAtual);
}

document.addEventListener("DOMContentLoaded", () => {

    const elemento = document.getElementById("contador");

    elemento.innerText = valorAtual.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const porcentagem = Math.min((valorAtual / meta) * 100,100);

    document.getElementById("barra").style.width =
        porcentagem + "%";

});

let valorSelecionado = 0;

function selecionarValor(valor, botao){

    valorSelecionado = valor;

    document.querySelectorAll(".botoes-valores button").forEach(b=>{
        b.classList.remove("ativo");
    });

    botao.classList.add("ativo");
}

function irParaPagamento(){

    if(valorSelecionado === 0){
        alert("Escolha um valor primeiro!");
        return;
    }

    valorAtual += valorSelecionado;

    localStorage.setItem("valorArrecadado", valorAtual);

    const link =
    "https://nubank.com.br/cobrar/17dl27/69a48122-a633-4095-9844-337c3d803ca7?amount=" + valorSelecionado;

    window.open(link, "_blank");

    setTimeout(()=>{
        window.location.href = "obrigado.html";
    },3000);
}

function criarCoracao(){

    const area = document.querySelector(".coracoes");
    if(!area) return;

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

setInterval(criarCoracao, 400);

