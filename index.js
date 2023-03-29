const readline = require("readline-sync");
const { validarEncerramento } = require("./utils/utilidade.js");
const { programaUm } = require("./calculoTrecho.js");
const { programaDois } = require("./cadastroTransporte.js");
const { programaTres } = require("./dadosEstatisticos.js");

const executarOpcoes = () => {
  let opcoesParaUsuario = readline.question(`
  1- Calcular trecho
  2- Cadastrar transporte
  3- Dados Estatisticos
  sair
  `);
  return opcoesParaUsuario;
};

const inicioApplicativo = () => {
  console.log("Olá: oque gostaria de fazer?");
  let opcaoEscolhida = executarOpcoes();

  switch (opcaoEscolhida) {
    case "1": {
      console.log(programaUm());
      return inicioApplicativo();
    }
    case "2": {
      console.log(programaDois());
      return inicioApplicativo();
    }
    case "3": {
      programaTres();
      return inicioApplicativo();
    }
    case "sair":
      validarEncerramento();
      break;
    default:
      inicioApplicativo();
  }
};

inicioApplicativo();

//

//1- Calculate km remaining (B-C) * price of small/km - medium/km - large/km
// Cheapeast
//2- if remainaing weight <= capacity*quantity  === true = fits truck (if more than one, divide into quantity of truck x) ( Do this for every truck I have)
//3- From list of trucks, calculate which is cheaper based off initial price calculation
