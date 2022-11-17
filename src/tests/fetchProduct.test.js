import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';


describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it('Verifica se  se o retorno da função fetchProduct com o argumento do produto "MLB1405519561" é uma estrutura de dados igual ao objeto produto que já está importado no arquivo', async () => {
  const result = await fetchProduct('MLB1405519561');
  expect(result).toEqual(product);
  });

  it('Verifica se ao chamar a função fetchProductsList sem argumento, retorna um erro com a mensagem: ID não informado', () => { 
    expect(fetchProduct()).rejects.toThrow('ID não informado');
  });

  it('Verifica se ao chamar a função fetchProductsList com argumento errado, retorna um erro com a mensagem.', async () => { 
    const result = await fetchProduct('MLB140551956X');
    expect(result).toBe('URL não mapeadahttps://api.mercadolibre.com/items/MLB140551956X');
  });

});
