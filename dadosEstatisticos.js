const { dadosEstatisticos } = require("./utils/utilidade");

const programaTres = () => dadosEstatisticos.map((el) => console.table(el));

module.exports = { programaTres };
