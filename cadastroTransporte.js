// USUARIO LISTAR LISTA DE SEQUENCIA:
const readline = require('readline-sync')
const {dadosFormatados, porte, cidades, arrayDePortes, validarEncerramento } = require('./utils/utilidade')
const {pergunta} = require('./utils/input')

const adquirirOrigem = pergunta("Origem: ", cidades, "Cidade não tabelada, por favor entre novamente.")
const adquirirParada = pergunta("Parada: ", cidades, "Cidade não tabelada, por favor entre novamente.")
const adquirirDestino =pergunta("Destino: ", cidades, "Cidade não tabelada, por favor entre novamente.")

const trechoMapa = [adquirirOrigem, adquirirParada, adquirirDestino]
console.log(trechoMapa) // [belem, aracaju, sao paulo]

// FUNCAO: belem-aracaju (distancia), aracaju-saopaulo (distancia)
// A-B : TOTAL DISTANCIA
// A_B : TODOS OS ITENS (array-kg), somar todos os kg = totalKg
// QUAL CAMINHAO ADEQUADO,
//  caminhaoadequanto * preco = total custo (A_B)

// REPETIR B_C

// DISTANCIA POR TRECHO
// DISTANCIA TOTAL: distancia por trecho A-B = xkm, B-C = ykm = xkm+ykm;
// Descobrir Caminhao adequado (pode ser mais que um)
// Custo trecho
// Custo total