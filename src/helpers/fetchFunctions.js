export const fetchProduct = () => {
// codigo
};

export const fetchProductsList = async (query) => {
  const urlQuery = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  try {
    const response = await fetch(urlQuery);
    const data = await response.json();
    return data.results;
  } catch {
    throw Error('Termo de busca não informado');
  }
};
