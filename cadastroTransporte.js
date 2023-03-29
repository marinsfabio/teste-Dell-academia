const { pergunta } = require("./utils/input");
const { kmPorTrecho, pesoKgItensQty } = require("./utils/query");
const { logDirecoes, logProgramaDois } = require("./utils/logs");
const { arrayPrecoPorte } = require("./utils/utilidade");
const { capacidadeFrota } = require("./utils/dados");

const readline = require("readline-sync");
const {
  cidades,
  itens,
  dadosEstatisticos,
  itensArr,
} = require("./utils/utilidade");

const programaDois = () => {
  // PERGUNTAS AO USUARIO(CIDADES)
  let adquirirOrigem = pergunta(
    "Origem: ",
    cidades,
    "Cidade não tabelada, por favor entre novamente."
  );
  let adquirirParada = pergunta(
    "Parada: ",
    cidades,
    "Cidade não tabelada, por favor entre novamente."
  );
  let adquirirDestino = pergunta(
    "Destino: ",
    cidades,
    "Cidade não tabelada, por favor entre novamente."
  );

  // Calculo Km Por Trecho
  const primeiraMetadeKm = kmPorTrecho(adquirirOrigem, adquirirParada);
  const segundaMetadeKm = kmPorTrecho(adquirirParada, adquirirDestino);

  //Calculo TOTAL km
  const totalKm = primeiraMetadeKm + segundaMetadeKm;

  // Explicacao de como adicionar ITENS/QUANTIDADES
  logDirecoes("Observe a lista the itens abaixo", itensArr, "desejados");

  // Perguntar Itens/validar
  let adquirirItens = pergunta(
    "Itens: ",
    itensArr,
    "Item não tabelado, por favor entre novamente."
  );

  let arrItensDesejados = [];

  //Esperar Input de QUANTIDADE para encerrar listagem de itens
  itensArr.push("quantidade".toUpperCase());

  while (adquirirItens !== "QUANTIDADE") {
    arrItensDesejados.push(adquirirItens);
    adquirirItens = pergunta(
      "Item: ",
      itensArr,
      "Item não tabelado, por favor entre novamente."
    );
  }

  itensArr.filter((el) => el !== "QUANTIDADE");

  // QUANTIDADE DE ITENS DESEJADOS
  const arrDeQuantidade = arrItensDesejados.map((el, index) => {
    return readline.question(`Quantidade de ${el}`);
  });

  // Explicacao de como adicionar Itens a serem deixados, e quantidade
  logDirecoes(
    `Quais itens seram deixados em ${adquirirParada}`,
    arrItensDesejados,
    "a serem deixados"
  );

  // ADIQUIRIR ITENS DROPADOS NA PARADA
  let adquirirItensRemovidos = pergunta(
    "Itens: ",
    arrItensDesejados,
    "Item não foi previamente escolhido, por favor entre novamente."
  );

  let arrItensRemovidos = [];

  arrItensDesejados.push("quantidade".toUpperCase());

  while (adquirirItensRemovidos !== "QUANTIDADE") {
    arrItensRemovidos.push(adquirirItensRemovidos);
    adquirirItensRemovidos = pergunta(
      "Itens: ",
      arrItensDesejados,
      "Item não foi previamente escolhido, por favor entre novamente."
    );
  }

  arrItensDesejados = arrItensDesejados.filter((el) => el !== "QUANTIDADE");

  // Obter quantidade de itens deixados (faltando validacao caso quantidade seja maior ke adicionado originalmente)
  const arrDeQuantidadeDropada = arrItensRemovidos.map((el, index) =>
    readline.question(`Quantidade de ${el}: `)
  );

  // CALCULO PESO PRIMEIRO TRECHO:
  let pesoKgTrechoUm = pesoKgItensQty(
    arrItensDesejados,
    arrDeQuantidade,
    itens
  );

  // CALCULO PESO SEGUNDO TRECHO
  let totalKgRemovido = pesoKgItensQty(
    arrItensRemovidos,
    arrDeQuantidadeDropada,
    itens
  );

  let pesoKgTrechoDois = pesoKgTrechoUm - totalKgRemovido;

  // Caminhao Mais Economico
  let pequeno = 0;
  let medio = 0;
  let grande = 0;
  let total = pesoKgTrechoUm / 1000; //kg para ton

  const escolherCaminhao = () => {
    if (total >= 9) {
      grande++;
      total -= 10;
      escolherCaminhao();
    } else if (total < 9 && total >= 3) {
      medio++;
      total -= 4;
      escolherCaminhao();
    } else if (total <= 2 && total > 0) {
      pequeno++;
      total--;
      escolherCaminhao();
    }

    return { pequeno, medio, grande };
  };

  let frota = escolherCaminhao();

  // DADOS ESTATISTICOS
  let totalQtyCaminhao = Object.values(frota).reduce((a, b) => a + b);
  let totalDeItens = arrDeQuantidade.reduce((a, b) => Number(a) + Number(b));
  let arrayDeTotalIndividual = Object.values(frota).map((qty, index) => {
    return qty * arrayPrecoPorte[index];
  });
  let custoTotalPequeno = arrayDeTotalIndividual[0] * primeiraMetadeKm;
  let custoTotalMedio = arrayDeTotalIndividual[1] * primeiraMetadeKm;
  let custoTotalGrande = arrayDeTotalIndividual[2] * primeiraMetadeKm;
  let custoTotalPrimeiroTrecho =
    custoTotalPequeno + custoTotalMedio + custoTotalGrande;

  // DECOBRIR QUAL CAMINHAO SEGUE B-C
  let pesoTrechoDoisTon = pesoKgTrechoDois / 1000;

  const frotaAdequadaSegundoTrecho = () => {
    let pequenoQty = 0;
    let medioQty = 0;
    let grandeQty = 0;

    if (pesoTrechoDoisTon <= frota.pequeno * capacidadeFrota.PEQUENO) {
      pequenoQty += Math.ceil(pesoTrechoDoisTon / capacidadeFrota.PEQUENO);
    } else if (pesoTrechoDoisTon <= frota.medio * capacidadeFrota.MEDIO) {
      if (
        pesoTrechoDoisTon - capacidadeFrota.MEDIO <=
          frota.pequeno * capacidadeFrota.PEQUENO &&
        pesoTrechoDoisTon - capacidadeFrota.MEDIO >= 0
      ) {
        pequenoQty += Math.ceil(pesoTrechoDoisTon / capacidadeFrota.PEQUENO);
        pesoTrechoDoisTon -= capacidadeFrota.PEQUENO;
      }
      medioQty += Math.ceil(pesoTrechoDoisTon / capacidadeFrota.MEDIO);
    } else if (pesoTrechoDoisTon <= frota.grande * capacidadeFrota.GRANDE) {
      if (
        pesoTrechoDoisTon - capacidadeFrota.GRANDE <=
          frota.pequeno * capacidadeFrota.MEDIO &&
        pesoTrechoDoisTon - capacidadeFrota.GRANDE >= 0
      ) {
        medioQty += Math.ceil(pesoTrechoDoisTon / capacidadeFrota.MEDIO);
        pesoTrechoDoisTon -= capacidadeFrota.MEDIO;
      } else if (
        pesoTrechoDoisTon - capacidadeFrota.GRANDE <=
          frota.pequeno * capacidadeFrota.PEQUENO &&
        pesoTrechoDoisTon - capacidadeFrota.GRANDE >= 0
      ) {
        pequenoQty += Math.ceil(pesoTrechoDoisTon / capacidadeFrota.PEQUENO);
        pesoTrechoDoisTon -= capacidadeFrota.PEQUENO;
      }
      grandeQty += Math.ceil(pesoTrechoDoisTon / capacidadeFrota.GRANDE);
    }
    return { pequenoQty, medioQty, grandeQty };
  };

  // DADOS ESTATISTICOS TRECHO DOIS
  let frotaSegundoTrecho = frotaAdequadaSegundoTrecho();
  let frotaQtySegundoTrecho = Object.values(frotaSegundoTrecho).reduce(
    (a, b) => a + b
  );
  let custoPequeno =
    frotaSegundoTrecho.pequenoQty * arrayPrecoPorte[0] * segundaMetadeKm;
  let custoMedio =
    frotaSegundoTrecho.medioQty * arrayPrecoPorte[1] * segundaMetadeKm;
  let custoGrande =
    frotaSegundoTrecho.grandeQty * arrayPrecoPorte[2] * segundaMetadeKm;
  let custoTotalSegundoTrecho = custoPequeno + custoMedio + custoGrande;
  let custoTotal = custoTotalPrimeiroTrecho + custoTotalSegundoTrecho;
  let custoMedioKm = custoTotal / totalKm;
  let custoMedioKmTrechoUm = custoTotalPrimeiroTrecho / primeiraMetadeKm;
  let custoMedioKmTrechoDois = custoTotalSegundoTrecho / primeiraMetadeKm;
  let custoMedioKmPequenoTrechoUm = custoTotalPequeno / primeiraMetadeKm;
  let custoMedioKmMedioTrechoUm = custoTotalMedio / primeiraMetadeKm;
  let custoMedioKmGrandeTrechoUm = custoTotalGrande / primeiraMetadeKm;
  let custoMedioKmPequenoTrechoDois = custoPequeno / segundaMetadeKm;
  let custoMedioKmMedioTrechoDois = custoMedio / segundaMetadeKm;
  let custoMedioKmGrandeTrechoDois = custoGrande / segundaMetadeKm;
  let custoMedioKmPequeno =
    custoTotalPequeno / primeiraMetadeKm + custoPequeno / segundaMetadeKm;
  let custoMedioKmMedio =
    custoTotalMedio / primeiraMetadeKm + custoMedio / segundaMetadeKm;
  let custoMedioKmGrande =
    custoTotalGrande / primeiraMetadeKm + custoGrande / segundaMetadeKm;

  // PROGRAMA TRES!
  const objDados = {
    origem: adquirirOrigem,
    parada: adquirirParada,
    destino: adquirirDestino,
    "distancia total": totalKm,
    "distancia primeiro trecho": primeiraMetadeKm,
    "distancia segundo trecho": segundaMetadeKm,
    "peso total inicial": pesoKgTrechoUm,
    "peso removido em parada": totalKgRemovido,
    "peso de parada a destino final": pesoKgTrechoDois,
    frota: frota,
    "frota segundo trecho": frotaSegundoTrecho,
    "quantidade de caminhoes inicial": totalQtyCaminhao,
    "quantidade de caminhoes segundo trecho": frotaQtySegundoTrecho,
    "quantidades de itens": totalDeItens,
    "CUSTO TOTAL": custoTotal,
    "custo primeiro trecho": custoTotalPrimeiroTrecho,
    "custo segundo trecho": custoTotalSegundoTrecho,
    "custo medio por km": custoMedioKm,
    "custo medio por km trecho um": custoMedioKmTrechoUm,
    "custo medio por km trecho dois": custoMedioKmTrechoDois,
    "custo total frota pequena trecho 1": custoTotalPequeno,
    "custo total frota media trecho 1": custoTotalMedio,
    "custo total frota grande trecho 1": custoTotalGrande,
    "custo total frota pequena trecho 2": custoPequeno,
    "custo total frota media trecho 2": custoMedio,
    "custo total frota grande trecho 2": custoGrande,
    // ADD TO LOG
    "custo total medio/km frota pequena": custoMedioKmPequeno,
    "custo total medio/km frota media": custoMedioKmMedio,
    "custo total medio/km frota grande": custoMedioKmGrande,
    "custo trecho um medio/km frota pequena": custoMedioKmPequenoTrechoUm,
    "custo trecho um medio/km frota media": custoMedioKmMedioTrechoUm,
    "custo trecho um medio/km frota grande": custoMedioKmGrandeTrechoUm,
    "custo trecho dois medio/km frota pequena": custoMedioKmPequenoTrechoDois,
    "custo trecho dois medio/km frota media": custoMedioKmMedioTrechoDois,
    "custo trecho dois medio/km frota grande": custoMedioKmGrandeTrechoDois,
  };
  dadosEstatisticos.push(objDados);
  return logProgramaDois(objDados);
};

module.exports = { programaDois };
