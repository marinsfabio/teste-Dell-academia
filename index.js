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
       console.log(calculoTrechoModalidade());
       return inicioApplicativo()
    } ;
    case "2": {
      const {calculoTrechoModalidade} = require('./calculoTrecho.js') // require
      console.log("Escolheu 2"); // chama o programa
      return inicioApplicativo(); // return reinicio
    }
    case "3": {
      const {calculoTrechoModalidade} = require('./calculoTrecho.js') // require
      console.log("Escolheu 2"); // chama o programa
      return inicioApplicativo(); // return reinicio
    }
    case "sair": validarEncerramento();
    break;
    default: inicioApplicativo();
}
}

inicioApplicativo()


