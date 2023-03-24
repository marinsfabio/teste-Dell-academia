const readline = require('readline-sync');
const {dadosFormatados, porte, cidades, arrayDePortes, validarEncerramento } = require('./utils/utilidade.js')


// ORIGEM
const adquirirOrigem = ()=>{

  let origem = readline.question('Origem: ').toUpperCase();
  if(origem === "SAIR") return validarEncerramento();

  while(!cidades.includes(origem)){
    console.log("Cidade não tabelada, por favor entre novamente.")
    origem = readline.question('Origem: ').toUpperCase()
  }
  return origem
}

// DESTINO
const adquirirDestino = ()=>{
  let destino = readline.question('Destino: ').toUpperCase()
  if(destino === "SAIR") return validarEncerramento();

  while(!cidades.includes(destino)){
    console.log("Cidade não tabelada, por favor entre novamente.")
    destino = readline.question('Destino: ').toUpperCase()
  }
  return destino
}

// PORTE
const adquirirPorte =()=>{
  let porteDesejado = readline.question('Porte: ').toLowerCase()
  if(porteDesejado === "sair") return validarEncerramento();
  while(!arrayDePortes.includes(porteDesejado)){
    console.log("Portes desponiveis: pequeno, medio, grande")
    porteDesejado = readline.question('Porte: ').toLowerCase()
  }
  return porteDesejado
}

// Chamada leitura do usuario
let origem = adquirirOrigem()
let destino = adquirirDestino()
let porteDesejado = adquirirPorte();


// Buscar dados cidade origem
function buscarDados(origem) {
  let indexDaOrigem = cidades.indexOf(origem)
  return dadosFormatados[indexDaOrigem]
}

// Calcular distancia entre origem e destino
function distanciaOrigemDestino(destino, arrDadosOrigem) {
  let indexDestino = cidades.indexOf(destino)
  return arrDadosOrigem[indexDestino]
}

// Buscar preco do porte escolhido
function precoPorte (porteScopado){
let indexDoPorte = arrayDePortes.indexOf(porteScopado);
let arrDePrecos = Object.values(porte);
return arrDePrecos[indexDoPorte];
}

// Funcao Calculo:
const calculoTrechoModalidade = ()=>{

 let arrDadosOrigem = buscarDados(origem);
 let distancia = distanciaOrigemDestino(destino, arrDadosOrigem)
 let total = distancia * precoPorte(porteDesejado)
 let totalFormatado = String(total).replace(".", ",")
 return `de ${origem} para ${destino}, utilizando um caminhão de ${porteDesejado} porte, a distância é de ${distancia} km e o custo será de R$ ${totalFormatado}.`
}


module.exports = {calculoTrechoModalidade}