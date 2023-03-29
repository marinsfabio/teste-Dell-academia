const { cidades, itens, distancia, porte } = require("./dados");

const organizarDadosCidade = (distancia) => distancia.splice(0, 24);

function distanciaCidades(distanciaScopada, cidades) {
  let arr = [];
  for (let i = 0; i < cidades.length; i++) {
    arr.push(organizarDadosCidade(distanciaScopada));
  }
  return arr;
}

const dadosFormatados = distanciaCidades(distancia, cidades);

const arrayDePortes = Object.keys(porte);

const arrayPrecoPorte = Object.values(porte);

let itensArr = Object.keys(itens);

const validarEncerramento = () => process.exit();

const dadosEstatisticos = [];

module.exports = {
  dadosFormatados,
  porte,
  cidades,
  arrayDePortes,
  validarEncerramento,
  itens,
  dadosEstatisticos,
  itensArr,
  arrayPrecoPorte,
};
