import { searchCep } from './helpers/cepFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
import './style.css';

// Search html
document.querySelector('.cep-button').addEventListener('click', searchCep);
const sectionListProducts = document.querySelector('.products');
const cart = document.querySelector('.cart__products');
const total = document.querySelector('.total-price');

// Add products on site
const loadingAlert = () => {
  const message = document.createElement('p');
  message.classList.add('loading');
  message.innerHTML = 'carregando...';
  sectionListProducts.appendChild(message);
};

const APIerror = () => {
  const message = document.createElement('p');
  message.classList.add('error');
  message.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  sectionListProducts.appendChild(message);
};

const createProductList = async () => {
  loadingAlert();
  try {
    const equipments = await fetchProductsList('computador');
    equipments.forEach((equipment) => {
      const item = createProductElement(equipment);
      sectionListProducts.appendChild(item);
    });
    const removeLoading = document.querySelector('.loading');
    removeLoading.remove();
  } catch {
    return APIerror();
  }
};

createProductList();

// Add to cart

function showProductsInsideCart() {
  const productsSaved = getSavedCartIDs();
  let finalPrice = 0;
  productsSaved.forEach(async (product) => {
    const findProduct = await fetchProduct(product);
    const productFound = createCartProductElement(findProduct);
    cart.appendChild(productFound);
    finalPrice += findProduct.price;
    total.textContent = finalPrice.toFixed(2);
  });
}

function addInsideCart(event) {
  if (event.target.parentNode.className === 'product') {
    const getID = event.target.parentNode.firstChild.innerHTML;
    saveCartID(getID);
    cart.innerHTML = '';
    showProductsInsideCart();
  }
}

sectionListProducts.addEventListener('click', addInsideCart);

window.onload = () => {
  showProductsInsideCart();
};
