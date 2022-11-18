const cartAddress = document.querySelector('.cart__address');

export const getAddress = (cep) => {
  const url1 = fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
  const url2 = fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  const number = 8;
  if (!cep || cep.length !== number) {
    throw new Error('CEP não encontrado');
  }
  return Promise.any([url1, url2])
    .then((response) => response.json())
    .then((data) => {
      // Rua - Bairro - Cidade - Estado = Praça da Sé - Sé - São Paulo - SP.
      if ('address' in data) {
        const { address, district, city, state } = data;
        cartAddress.innerHTML = `${address} - ${district} - ${city} - ${state}`;
        return cartAddress;
      }
      const { street, neighborhood, city, state } = data;
      cartAddress.innerHTML = `${street} - ${neighborhood} - ${city} - ${state}`;
      return cartAddress;
    });
};

export const searchCep = async () => {
  const cep = document.querySelector('.cep-input').value;
  try {
    await getAddress(cep);
  } catch (error) {
    cartAddress.innerHTML = 'CEP não encontrado';
  }
};
