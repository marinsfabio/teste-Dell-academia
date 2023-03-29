const {
  cidades,
  arrayDePortes,
  dadosFormatados,
  porte,
} = require("../utils/utilidade");

// Buscar dados cidade origem
function buscarDados(origem) {
  let indexDaOrigem = cidades.indexOf(origem);
  return dadosFormatados[indexDaOrigem];
}

// Buscar (dados) distancia entre origem e destino
function distanciaOrigemDestino(destino, arrDadosOrigem) {
  let indexDestino = cidades.indexOf(destino);
  return arrDadosOrigem[indexDestino];
}

// Calcular distancia entre cidade A a cidade B
function kmPorTrecho(pontoA, pontoB) {
  let dadosOrigem = buscarDados(pontoA);
  return distanciaOrigemDestino(pontoB, dadosOrigem);
}

// Buscar preco do porte escolhido
function precoPorte(porteScopado) {
  let indexDoPorte = arrayDePortes.indexOf(porteScopado);
  let arrDePrecos = Object.values(porte);
  return arrDePrecos[indexDoPorte];
}

// Calcular peso Array de itens por array de quantidade
function pesoKgItensQty(arrayItens, arrayQuantidades, objItensOriginal) {
  let arrPesoKgItens = arrayItens.map(
    (el, index) => objItensOriginal[el] * Number(arrayQuantidades[index])
  );
  return arrPesoKgItens.reduce((a, b) => a + b);
}

module.exports = {
  buscarDados,
  distanciaOrigemDestino,
  precoPorte,
  kmPorTrecho,
  pesoKgItensQty,
};
