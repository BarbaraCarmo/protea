const dadosSemaforo = require('../data/semaforoDoCorpo');
const dadosToque = require('../data/toqueBomVsRuim');
const dadosPoderDoNao = require('../data/poderDoNao');
const adultosDeConfianca = require('../data/adultosDeConfianca');

exports.getSemaforoDoCorpo = (req, res) => {
  res.json(dadosSemaforo);
};

exports.getToqueBomVsRuim = (req, res) => {
  res.json(dadosToque);
};

exports.getPoderDoNao = (req, res) => {
  res.json(dadosPoderDoNao);
};

exports.getAdultosDeConfianca = (req, res) => {
  res.json(adultosDeConfianca);
};
