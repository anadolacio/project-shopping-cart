import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Verifica se função fetchProductsList com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.', async () => {
  const result = await fetchProductsList('computador');
  expect(result).toEqual(computadorSearch);
  });

  it('Verifica se ao chamar a função fetchProductsList sem argumento, retorna um erro com a mensagem: Termo de busca não informado', () => { 
    expect(fetchProductsList()).rejects.toThrow('Termo de busca não informado');
  });

  it('Verifica se ao chamar a função fetchProductsList com argumento errado, retorna um erro com a mensagem.', async () => { 
    const result = await fetchProductsList('X');
    expect(result).toBe('URL não mapeadahttps://api.mercadolibre.com/sites/MLB/search?q=X');
  });

});

