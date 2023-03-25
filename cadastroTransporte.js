// USUARIO LISTAR LISTA DE SEQUENCIA:
const readline = require('readline-sync')
const {dadosFormatados, porte, cidades, arrayDePortes, validarEncerramento } = require('./utils/utilidade')

const adquirirOrigem = ()=>{

  let origem = readline.question('Origem: ').toUpperCase();
  if(origem === "SAIR") return validarEncerramento();

  while(!cidades.includes(origem)){
    console.log("Cidade não tabelada, por favor entre novamente.")
    origem = readline.question('Origem: ').toUpperCase()
  }
  return origem
}

const adquirirParada = ()=>{

  let parada = readline.question('Parada: ').toUpperCase();
  if(parada === "SAIR") return validarEncerramento();

  while(!cidades.includes(parada)){
    console.log("Cidade não tabelada, por favor entre novamente.")
    parada = readline.question('parada: ').toUpperCase()
  }
  return parada
}

const adquirirDestino = ()=>{

  let destino = readline.question('Destino: ').toUpperCase();
  if(destino === "SAIR") return validarEncerramento();

  while(!cidades.includes(destino)){
    console.log("Cidade não tabelada, por favor entre novamente.")
    destino = readline.question('destino: ').toUpperCase()
  }
  return destino
}

const trechoMapa = [adquirirOrigem(), adquirirParada(), adquirirDestino()]
console.log(trechoMapa)

// CALCULAR DISTANCIA TOTAL
// DISTANCIA TOTAL: distancia por trecho A-B = xkm, B-C = ykm = xkm+ykm;
// Descobrir Caminhao adequado (pode ser mais que um)
// Custo trecho
// Custo total