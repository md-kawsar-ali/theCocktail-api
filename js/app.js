const productContainer = document.getElementById('products');

// Call API for Most Popular Cocktails
const mostPopular = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v2/1/popular.php');
    const data = await response.json();
    displayProduct(data);
}

mostPopular();

// Display Cocktails
const displayProduct = data => {
    const arr = data.drinks;
    arr?.map(product => {
        let { idDrink, strDrinkThumb } = product;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card shadow-none">
            <img onclick="singleProduct('${idDrink}')" data-bs-toggle="modal" data-bs-target="#single" src="${strDrinkThumb}" />
        </div>`;

        productContainer.appendChild(div);
    });
}

// Call API and Display Details
const singleProduct = async (id) => {
    // Show Preloader
    document.querySelector('.loading').style.display = 'flex';
    document.querySelector('.loading').style.opacity = '1';

    // Call API
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const data = await response.json();
    const { strDrink, strInstructions, strDrinkThumb } = data.drinks[0];

    // Display Details
    document.querySelector('.modal-title').innerText = strDrink;
    document.querySelector('.modal-body img').src = strDrinkThumb;
    document.querySelector('.modal-body p').innerText = strInstructions;

    // Hide Preloader
    document.querySelector('.loading').style.opacity = '0';
    setTimeout(function () {
        document.querySelector('.loading').style.display = 'none';
    }, 500);
}