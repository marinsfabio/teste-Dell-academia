const readline = require("readline-sync");
const { validarEncerramento } = require("./utilidade.js");

const validarInput = (arr, resposta, feedback, pergunta) => {
  let respostaValida = resposta;
  if (respostaValida === "SAIR") return validarEncerramento();

  while (!arr.includes(respostaValida)) {
    console.log(feedback);
    respostaValida = readline.question(pergunta).toUpperCase();
  }
  return respostaValida;
};

const pergunta = (pergunta, arr, feedback) => {
  let resposta = readline.question(pergunta).toUpperCase();
  if (resposta === "SAIR") return validarEncerramento();
  return validarInput(arr, resposta, feedback, pergunta) || resposta;
};

module.exports = {
  pergunta,
};
