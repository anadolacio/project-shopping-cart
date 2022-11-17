export const fetchProduct = async (id) => {
  const urlId = `https://api.mercadolibre.com/items/${id}`;
  if (!id) throw Error('ID não informado');
  try {
    const response = await fetch(urlId);
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

export const fetchProductsList = async (query) => {
  const urlQuery = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  if (!query) throw Error('Termo de busca não informado');
  try {
    const response = await fetch(urlQuery);
    const data = await response.json();
    return data.results;
  } catch (error) {
    return error.message;
  }
};
