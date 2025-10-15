document.getElementById("formBusqueda").addEventListener("submit", function(e) {
    e.preventDefault();

    const texto = document.getElementById("inputBusqueda").value.trim();
    if (!texto) return;

    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${texto}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const contenedor = document.getElementById("resultado");
        contenedor.innerHTML = "";

        if (!data.drinks) {
          contenedor.innerHTML = "<p class='text-center fw-bold'>No se encontraron resultados.</p>";
          return;
        }

        const drink = data.drinks[0];

        const card = document.createElement("div");
        card.className = "card m-3";
        card.style.width = "18rem";
        card.innerHTML = `
          <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
          <div class="card-body">
            <h5 class="card-title">${drink.strDrink}</h5>
            <p class="card-text">${drink.strCategory} - ${drink.strAlcoholic}</p>
            <button class="btn btn-primary" id="btnIngredientes">Ver ingredientes</button>
          </div>
        `;

        contenedor.appendChild(card);

        document.getElementById("btnIngredientes").addEventListener("click", () => {
          mostrarIngredientes(drink);
        });
      })
      .catch(error => console.error(error));
});

function mostrarIngredientes(drink) {
    let ingredientes = "";

    for (let i = 1; i <= 15; i++) {
        const ing = drink[`strIngredient${i}`];
        const medida = drink[`strMeasure${i}`];
        if (ing) {
            ingredientes += `<li>${ing}${medida ? ` - ${medida}` : ""}</li>`;
        }
    }

    const contenedor = document.getElementById("resultado");
    contenedor.innerHTML = `
      <div class="card m-3" style="width: 18rem;">
        <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
        <div class="card-body">
          <h5 class="card-title">${drink.strDrink}</h5>
          <p class="card-text"><strong>Ingredientes:</strong></p>
          <ul>${ingredientes}</ul>
          <button class="btn btn-secondary" id="btnVolver">Volver</button>
        </div>
      </div>
    `;
        contenedor.innerHTML = `
      <div class="card m-3" style="width: 18rem;">
        <img src="${drink.strDrinkThumb}" class="card-img-top" alt="${drink.strDrink}">
        <div class="card-body">
          <h5 class="card-title">${drink.strDrink}</h5>
          <p class="card-text"><strong>Ingredientes:</strong></p>
          <ul>${ingredientes}</ul>
          <button class="btn btn-secondary" id="btnVolver">Volver</button>
        </div>
      </div>
    `;

    document.getElementById("btnVolver").addEventListener("click", () => {
      document.getElementById("formBusqueda").dispatchEvent(new Event("submit"));
    });
}
