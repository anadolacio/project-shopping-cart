import { searchCep } from './helpers/cepFunctions';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import './style.css';

// Search html
document.querySelector('.cep-button').addEventListener('click', searchCep);
const sectionListProducts = document.querySelector('.produtcs');

// Functions

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
  try {
    sectionListProducts.appendChild(loadingAlert);
    const products = await fetchProductsList('computador');
    products.forEach((product) => {
      const { id, title, thumbnail, price } = product;
      sectionListProducts.appendChild(
        createProductElement({ id, title, thumbnail, price }),
      );
    });
    const removeLoading = document.querySelector('.loading');
    removeLoading.remove();
  } catch (error) {
    return APIerror();
  }
};
