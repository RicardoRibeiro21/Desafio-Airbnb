const apiUrl = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
const apiUrlGoogle = "https://v2-api.sheety.co/6b2ed2a5fab94b08729b38ed6aa2468c/desafioAirbnb/dados";
const divCards = document.getElementById("cards");

let data = [];
let dataPaginacao = {
    pag1: [],
    pag2: [],
    pag3: []
}

async function buscaDados(url) {
    return await fetch(url)
        .then(async (resposta) => await resposta.json())
}

async function main() {
    data = await buscaDados(apiUrl);
    separaArray(data);
    paginacao(1);

    //Dados para importação de latitude e longitude
    dataGoogle = await buscaDados(apiUrlGoogle);
    console.log(dataGoogle);
}

//Selecionando a pagina que o usuário escolheu
function paginacao(pagina) {
    let paginaCarregada = [];
    switch (pagina) {
        case 1:
            paginaCarregada = dataPaginacao.pag1;
            break;
        case 2:
            paginaCarregada = dataPaginacao.pag2;
            break;
        case 3:
            paginaCarregada = dataPaginacao.pag3;
            break;
        default:
            paginaCarregada = dataPaginacao.pag1;
            break;
    }
    //Armazenando a página escolhida no local Storage    
    localStorage.setItem("pagina-escolhida", pagina);

    //Bloco que será renderizado
    divCards.style.width = "100%";
    divCards.innerHTML = paginaCarregada.map((card, index) =>
        `
            <div class="card" key=${index}>
            <img src=${card.photo} alt="Imagem da estadia" />
            <h5 class="card-title">${card.name}</h5>
            <p class="card-text">${card.property_type}</p>
            <p class="card-text preco">Preço R$ ${card.price},00</p>
            </div>
        `
    ).join("");
}

function prevNext(escolha) {
    let pagina = localStorage.getItem("pagina-escolhida");
    if (escolha === "prev") {
        if (pagina >= 2) paginacao((pagina - 1));
        else alert("voce ja esta no limite");
    } else if (escolha === "next") {
        if (pagina <= 3) {
            pagina++;
            paginacao(pagina);
        }
        else alert("Voce está no limite")
    }

}
function separaArray(data) {
    //Separando os itens
    data.map((item, index) => {
        if (index < 9) {
            dataPaginacao.pag1.push(item);
        } else if (index >= 9 && index < 18) {
            dataPaginacao.pag2.push(item);
        } else {
            dataPaginacao.pag3.push(item);
        }
    });
}

main();
