const apiUrl = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
const divCards = document.getElementById("cards");
let data = [];

async function buscaDados() {
    return await fetch(apiUrl)
        .then(async (resposta) => await resposta.json())
}

async function main() {
    data = await buscaDados();
    const div = document.getElementById("cards");
    div.style.width = "100%";
    div.innerHTML = data.map((card, index) =>
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

main();
