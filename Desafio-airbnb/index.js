const apiUrl = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
const apiUrlGoogle = "https://v2-api.sheety.co/6b2ed2a5fab94b08729b38ed6aa2468c/desafioAirbnb/dados";
const divCards = document.getElementById("cards");

let data = [];

//Objeto que armazena 3 vetores para separar os itens
let dataPaginacao = {
    pag1: [],
    pag2: [],
    pag3: []
}

//Função para buscar os dados
async function buscaDados(url) {
    return await fetch(url)
        .then(async (resposta) => await resposta.json())
}

//No main chamo minhas funções principais
async function main() {
    //Realizo a requisição
    data = await buscaDados(apiUrl);
    //Separo meu Array
    separaArray(data);
    //Defino qual página será selecionada no carregamento do meu site
    paginacao(1);

    //Dados para importação de latitude e longitude
    dataGoogle = await buscaDados(apiUrlGoogle);
}

//Recebo uma database e distribuo em meus arrays do Objeto dataPaginacao
function separaArray(data) {
    //Separando os itens
    data.map((item, index) => {
        if (index < 9) {
            //Armazeno os 9 primeiros itens no primeiro vetor que será os itens da primeira página
            dataPaginacao.pag1.push(item);
        } else if (index >= 9 && index < 18) {
            //Armazeno os próximos 9 itens no segundo vetor que será os itens da segunda página
            dataPaginacao.pag2.push(item);
        } else {
            //Armazeno os itens restantes em uma terceira página
            dataPaginacao.pag3.push(item);
        }
    });
}


//Selecionando a pagina que o usuário escolheu
function paginacao(pagina) {
    //Crio um vetor para receber qual vetor será renderizado na div
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
    //Armazenando a página escolhida no local Storage (armazenamento rápido do navegador)  
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
    //Resgato o valor da página que está armazenada no local storage
    let pagina = localStorage.getItem("pagina-escolhida");
    //Verificação dos limites 
    if (escolha === "prev") {
        if (pagina >= 2) paginacao((pagina - 1));
        else alerta("Avance a página");
    } else if (escolha === "next") {
        if (pagina < 3) {
            pagina++;
            paginacao(pagina);
        }
        else alerta("Volte a página")
    }

}

function alerta(mensagem) {
    const div = document.getElementById("alert");
    div.innerHTML =
        `
        <div class="alert alert-primary" role="alert">
            ${mensagem}
          </div>
        `
}
main();
