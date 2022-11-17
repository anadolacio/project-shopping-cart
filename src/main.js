import { searchCep } from './helpers/cepFunctions';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import './style.css';

// Search html
document.querySelector('.cep-button').addEventListener('click', searchCep);
const sectionListProducts = document.querySelector('.products');

// Functions

const createProductList = async () => {
  const equipments = await fetchProductsList('computador');
  equipments.forEach((equipment) => {
    const item = createProductElement(equipment);
    sectionListProducts.appendChild(item);
  });
};

createProductList();
