const readline = require('readline-sync');
const {validarEncerramento} = require('./utils/utilidade.js')

const executarOpcoes = ()=>{
  let opcoesParaUsuario = readline.question(`
  1- Calcular Trecho
  2- Calcular x
  3- Calcular y
  sair
  `)
  return opcoesParaUsuario
}

const inicioApplicativo = ()=>{
  console.log("Bom dia: oque gostaria de fazer?")
  let opcaoEscolhida = executarOpcoes()
 
  switch(opcaoEscolhida){
    case "1": {
      const {calculoTrechoModalidade} = require('./calculoTrecho.js')
      return console.log(calculoTrechoModalidade());
    } ;
    case "2": console.log("Escolheu 2");
    break;
    case "3": console.log("Escolheu 3");
    break;
    case "sair": validarEncerramento();
    break;
    default: inicioApplicativo();
}
}

inicioApplicativo()


