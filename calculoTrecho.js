const { cidades, arrayDePortes } = require("./utils/utilidade.js");
const { precoPorte, kmPorTrecho } = require("./utils/query");
const { pergunta } = require("./utils/input");

const programaUm = () => {
  //ORIGEM
  let origem = pergunta(
    "Origem: ",
    cidades,
    "Cidade não tabelada, por favor entre novamente."
  );

  // DESTINO
  let destino = pergunta(
    "Destino: ",
    cidades,
    "Cidade não tabelada, por favor entre novamente."
  );

  // PORTE
  let porteDesejado = pergunta(
    "Porte: ",
    arrayDePortes,
    "Portes desponiveis: pequeno, medio, grande"
  );

  // Funcao Calculo:
  const result = function calculoTrechoModalidade() {
    let distancia = kmPorTrecho(origem, destino);
    let total = distancia * precoPorte(porteDesejado);
    let totalFormatado = String(total).replace(".", ",");
    return `de ${origem} para ${destino}, utilizando um caminhão de ${porteDesejado} porte, a distância é de ${distancia} km e o custo será de R$ ${totalFormatado}.`;
  };

  return result();
};

module.exports = {
  programaUm,
};
