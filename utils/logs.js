//Programa dois
const logDirecoes = (instrucao, arr, keyword) => {
  console.log(`
  ${instrucao}
  Digite o NOME dos itens ${keyword} um por vez
  NOTA: Quando todos os itens desejados estiverem listados, digite: quantidade
  `);
  console.table(arr);
};

// Programa dois
const logProgramaDois = (obj) => {
  return `
  -----------------------------------------------------------------------------
  > TRECHO(km)
  -----------------------------------------------------------------------------
  *** ${obj.origem} *** ${obj.parada} *** ${obj.destino}
  
  De ${obj.origem} a ${obj.destino} a distancia total eh de: ${
    obj["distancia total"]
  }km;
  A parada é em ${obj.parada};
  De ${obj.origem} a ${obj.parada} a distancia é de ${
    obj["distancia primeiro trecho"]
  }km;
  E para encerrar a entrega, de ${obj.parada} a ${
    obj.destino
  } a distancia é de ${obj["distancia segundo trecho"]}km;
  
  -----------------------------------------------------------------------------
  > PESOS(kg)
  -----------------------------------------------------------------------------
  O Peso Initial do transporte é de ${
    obj["peso total inicial"]
  }kg ate chegar em ${obj.parada}, 
  onde ${obj["peso removido em parada"]}kg seram removidos.
  A segunda metade do trecho segue com ${
    obj["peso de parada a destino final"]
  }kg até ${obj.destino}
  
  -----------------------------------------------------------------------------
  > FROTA
  -----------------------------------------------------------------------------
  A frota necessaria (em conta que nenhum veiculo prossiga vazio pos parada) para o transporte é: ${
    obj.frota.pequeno
  } pequeno porte, ${obj.frota.medio} medio porte, ${
    obj.frota.grande
  } grande porte, para o total de
  ${obj["quantidade de caminhoes inicial"]} veiculos para suportar ${
    obj["quantidades de itens"]
  } itens da maneira mais economica na origem.
  Pos parada, apenas sera necessario que sigam ${
    obj["frota segundo trecho"].pequenoQty
  } pequenos, ${obj["frota segundo trecho"].medioQty} medios, e ${
    obj["frota segundo trecho"].grandeQty
  } grandes,
  portanto: com ${
    obj["quantidade de caminhoes segundo trecho"]
  } veiculos do segundo trecho ate destino.

  -----------------------------------------------------------------------------
  > CUSTOS(R$)
  -----------------------------------------------------------------------------
  O custo total do transporte (sem que nenhum veiculo siga vazio pos parada) é de R$${
    obj["CUSTO TOTAL"]
  }, sendo a media por km R$${obj["custo medio por km"].toFixed(2)}.
  O primeiro trecho custa R$${obj["custo primeiro trecho"]} e o segundo R$${
    obj["custo segundo trecho"]
  }.
  **
  O custo total para a kilometragem do trecho um referente a frota de pequeno porte é de: R$${
    obj["custo total frota pequena trecho 1"]
  }
  O custo total para a kilometragem do trecho um referente a frota de medio porte é de: R$${
    obj["custo total frota media trecho 1"]
  }
  O custo total para a kilometragem do trecho um referente a frota de grande porte é de: R$${
    obj["custo total frota grande trecho 1"]
  }
  **
  O custo total para a kilometragem do trecho dois referente a frota de pequeno porte é de: R$${
    obj["custo total frota pequena trecho 2"]
  }
  O custo total para a kilometragem do trecho dois referente a frota de medio porte é de: R$${
    obj["custo total frota media trecho 2"]
  }
  O custo total para a kilometragem do trecho dois referente a frota de grande porte é de: R$${
    obj["custo total frota grande trecho 2"]
  }

  -----------------------------------------------------------------------------
  > CUSTOS(R$) POR FROTA (detalhes)
  -----------------------------------------------------------------------------
  O custo total medio/km frota pequena é de $R${
    obj["custo total medio/km frota pequena"]
  }
  O custo total medio/km frota media é de $R${
    obj["custo total medio/km frota media"]
  }
  O custo total medio/km frota grande é de $R${
    obj["custo total medio/km frota grande"]
  }

  *** TRECHO UM APENAS ***

  O custo trecho um medio/km frota pequena é de $R${
    obj["custo trecho um medio/km frota pequena"]
  }
  O custo trecho um medio/km frota media é de $R${
    obj["custo trecho um medio/km frota media"]
  }
  O custo trecho um medio/km frota grande é de $R${
    obj["custo trecho um medio/km frota grande"]
  }

  *** TRECHO DOIS APENAS ***

  O custo trecho dois medio/km frota pequena é de $R${
    obj["custo trecho dois medio/km frota pequena"]
  }
  O custo trecho dois medio/km frota media é de $R${
    obj["custo trecho dois medio/km frota media"]
  }
  O custo trecho dois medio/km frota grande é de $R${
    obj["custo trecho dois medio/km frota grande"]
  }

  `;
};

module.exports = {
  logDirecoes,
  logProgramaDois,
};
