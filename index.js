const readline = require('readline-sync');
const {cidades,distancia } = require('./array.js')

const organizarDadosCidade = (distancia) => distancia.splice(0, 24);

function distanciaCidades(distanciaScopada, cidades) {
  let arr = [];
  for(let i = 0; i<cidades.length; i++ ){
    arr.push(organizarDadosCidade(distanciaScopada)) 
  }
  return arr
}

const dadosFormatados = distanciaCidades(distancia, cidades);

// PORTE DE TRANSPORTE
const porte = {
  pequeno: 4.87,
  medio: 11.92,
  grande: 27.44
}

// ORIGEM

const adquirirOrigem = ()=>{
  let origem = readline.question('Origem: ').toUpperCase()

  while(!cidades.includes(origem)){
    console.log("Cidade não tabelada, por favor entre novamente.")
    origem = readline.question('Origem: ').toUpperCase()
  }
  return origem
}

let origem = adquirirOrigem()


// DESTINO
const adquirirDestino = ()=>{
  let destino = readline.question('Destino: ').toUpperCase()

  while(!cidades.includes(destino)){
    console.log("Cidade não tabelada, por favor entre novamente.")
    destino = readline.question('Destino: ').toUpperCase()
  }
  return destino
}

let destino = adquirirDestino()

const arrayDePortes = Object.keys(porte)

// PORTE
const adquirirPorte =()=>{
  let porteDesejado = readline.question('Porte: ').toLowerCase()
  
  while(!arrayDePortes.includes(porteDesejado)){
    console.log("Portes desponiveis: pequeno, medio, grande")
    porteDesejado = readline.question('Porte: ').toLowerCase()
  }
  return porteDesejado
}

let porteDesejado = adquirirPorte();

// Funcao Calculo:

function buscarDados(origem) {
  let indexDaOrigem = cidades.indexOf(origem)
  return dadosFormatados[indexDaOrigem]
}

function distanciaOrigemDestino(destino, arrDadosOrigem) {
  let indexDestino = cidades.indexOf(destino)
  return arrDadosOrigem[indexDestino]
}

function precoPorte (porteScopado){
let indexDoPorte = arrayDePortes.indexOf(porteScopado);
let arrDePrecos = Object.values(porte);
return arrDePrecos[indexDoPorte];
}

const calculoTrechoModalidade = (origem, destino, porteDesejado)=>{
 let arrDadosOrigem = buscarDados(origem);
 let distancia = distanciaOrigemDestino(destino, arrDadosOrigem)
 let total = distancia * precoPorte(porteDesejado)
 let totalFormatado = String(total).replace(".", ",")
 return `de ${origem} para ${destino}, utilizando um caminhão de ${porteDesejado} porte, a distância é de ${distancia} km e o custo será de R$ ${totalFormatado}.`
}

console.log(calculoTrechoModalidade(origem, destino, porteDesejado))
