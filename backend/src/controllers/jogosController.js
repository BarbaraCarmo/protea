const dadosSemaforo = require('../data/semaforoDoCorpo');
const dadosToque = require('../data/toqueBomVsRuim');
const dadosPoderDoNao = require('../data/poderDoNao');

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
  res.json({
    titulo: 'Adultos de Confiança',
    descricao: 'Aprenda a identificar os adultos em quem você pode confiar e pedir ajuda.',
    icone: 'people-outline',
    fases: [
      {
        id: 1,
        pergunta: 'Quem são os adultos de confiança na sua vida?',
        tipo: 'selecao_multipla',
        opcoes: [
          { id: 'a', texto: 'Mãe ou Pai', correto: true },
          { id: 'b', texto: 'Professor(a) da escola', correto: true },
          { id: 'c', texto: 'Um desconhecido na rua', correto: false },
          { id: 'd', texto: 'Avó ou Avô', correto: true },
        ],
        feedbackCorreto: 'Muito bem! Essas são pessoas em quem você pode confiar!',
        feedbackIncorreto: 'Cuidado! Desconhecidos não são adultos de confiança. Procure sempre pessoas que você conhece bem.',
      },
      {
        id: 2,
        pergunta: 'Se algo te deixar triste ou com medo, o que você deve fazer?',
        tipo: 'escolha_unica',
        opcoes: [
          { id: 'a', texto: 'Guardar segredo e não contar para ninguém', correto: false },
          { id: 'b', texto: 'Contar para um adulto de confiança', correto: true },
          { id: 'c', texto: 'Fingir que nada aconteceu', correto: false },
        ],
        feedbackCorreto: 'Isso mesmo! Sempre conte para um adulto de confiança quando algo te deixar triste ou com medo.',
        feedbackIncorreto: 'Guardar segredos que te fazem mal não é bom. Contar para um adulto de confiança é sempre a melhor escolha!',
      },
      {
        id: 3,
        pergunta: 'Um adulto de confiança é alguém que...',
        tipo: 'escolha_unica',
        opcoes: [
          { id: 'a', texto: 'Te dá presentes para guardar segredo', correto: false },
          { id: 'b', texto: 'Te ouve, te protege e nunca pede segredos ruins', correto: true },
          { id: 'c', texto: 'Te diz para não contar nada para sua mãe', correto: false },
        ],
        feedbackCorreto: 'Perfeito! Um adulto de confiança te ouve, te protege e nunca pede para guardar segredos que te fazem mal.',
        feedbackIncorreto: 'Adultos que pedem segredos ou dão presentes para esconder algo NÃO são adultos de confiança.',
      },
      {
        id: 4,
        pergunta: 'Você pode ter mais de um adulto de confiança?',
        tipo: 'escolha_unica',
        opcoes: [
          { id: 'a', texto: 'Sim! Quanto mais, melhor!', correto: true },
          { id: 'b', texto: 'Não, só pode ter um', correto: false },
        ],
        feedbackCorreto: 'Isso aí! Você pode ter vários adultos de confiança: mãe, pai, avós, professores...',
        feedbackIncorreto: 'Na verdade, você pode sim ter vários adultos de confiança! Quanto mais, mais protegido você estará.',
      },
      {
        id: 5,
        pergunta: 'Se um adulto de confiança não puder te ajudar naquele momento, o que você faz?',
        tipo: 'escolha_unica',
        opcoes: [
          { id: 'a', texto: 'Desisto de contar', correto: false },
          { id: 'b', texto: 'Procuro outro adulto de confiança', correto: true },
          { id: 'c', texto: 'Fico com raiva e brigo', correto: false },
        ],
        feedbackCorreto: 'Muito bem! Se um adulto não puder ajudar, procure outro. Nunca desista de pedir ajuda!',
        feedbackIncorreto: 'Nunca desista de pedir ajuda! Se um adulto não puder te ajudar, procure outro adulto de confiança.',
      },
    ],
  });
};
