const meta = 3000;

let valorAtual = localStorage.getItem("valorArrecadado");

if(!valorAtual){
    valorAtual = 0;
}else{
    valorAtual = Number(valorAtual);
}

const links = {
    10: "https://nubank.com.br/cobrar/17dl27/69b71d0d-c508-421e-bd35-8a53ed85ebb8",
    25: "https://nubank.com.br/cobrar/17dl27/69b71f7a-72c8-459a-a465-37d7581ae716",
    50: "https://nubank.com.br/cobrar/17dl27/69b72094-ffe2-4c1b-aafb-cd27cf4124d4",
    100: "https://nubank.com.br/cobrar/17dl27/69b7211e-1adc-4847-ac0c-9f322294bef1"
};

document.addEventListener("DOMContentLoaded", () => {

    const elemento = document.getElementById("contador");

    elemento.innerText = valorAtual.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    const porcentagem = Math.min((valorAtual / meta) * 100, 100);

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

    const link = links[valorSelecionado];

    if(!link){
        alert("Valor não disponível para pagamento.");
        return;
    }

    window.open(link, "_blank");

    valorAtual += valorSelecionado;
    localStorage.setItem("valorArrecadado", valorAtual);

    const porcentagem = Math.min((valorAtual / meta) * 100, 100);
    document.getElementById("barra").style.width = porcentagem + "%";
    document.getElementById("contador").innerText =
    valorAtual.toLocaleString("pt-BR",{
        minimumFractionDigits:2,
        maximumFractionDigits:2
    });
    
    setTimeout(()=>{
        window.location.href = "obrigado.html";
    },3000);
}

function gerarPix(){

    const valor = Number(document.getElementById("valorLivre").value);

    if(!valor || valor <= 0){
        alert("Digite um valor válido");
        return;
    }

    const chavePix = "francymello167@gmail.com";
    const nome = "Doacao";
    const cidade = "SAO LUIS";

    function format(id, valor){
        const tamanho = valor.length.toString().padStart(2,"0");
        return id + tamanho + valor;
    }

    function crc16(str){
        let crc = 0xFFFF;

        for (let c = 0; c < str.length; c++) {
            crc ^= str.charCodeAt(c) << 8;

            for (let i = 0; i < 8; i++) {
                if ((crc & 0x8000) !== 0) {
                    crc = (crc << 1) ^ 0x1021;
                } else {
                    crc <<= 1;
                }
                crc &= 0xFFFF;
            }
        }

        return crc.toString(16).toUpperCase().padStart(4,'0');
    }

    let payload =
        format("00","01") +
        format("26",
            format("00","BR.GOV.BCB.PIX") +
            format("01",chavePix)
        ) +
        format("52","0000") +
        format("53","986") +
        format("54",valor.toFixed(2)) +
        format("58","BR") +
        format("59",nome) +
        format("60",cidade) +
        format("62",format("05","Doacao"));

    payload += "6304";

    payload += crc16(payload);

    const area = document.getElementById("areaPix");

    area.innerHTML = "";
    area.innerHTML += `<p>Valor: R$ ${valor.toFixed(2)}</p>`;
    area.innerHTML += `<div id="qrcode"></div>`;
    area.innerHTML += `<button id="copiarPixBtn">Copiar código PIX</button>`;
    document.getElementById("copiarPixBtn").onclick = () => copiarPix(payload);

    new QRCode(document.getElementById("qrcode"), {
        text: payload,
        width: 220,
        height: 220
    });

}

function copiarPix(codigo){
    navigator.clipboard.writeText(codigo);
    alert("Código PIX copiado!");
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
