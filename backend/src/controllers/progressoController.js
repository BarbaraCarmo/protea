const User = require('../models/User');

exports.getProgresso = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

    res.json({ progresso: user.progresso, medalhas: user.medalhas });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar progresso', erro: error.message });
  }
};

exports.atualizarProgresso = async (req, res) => {
  try {
    const { jogo, faseConcluida } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

    const jogosValidos = ['semaforoDoCorpo', 'toqueBomVsRuim', 'poderDoNao', 'adultoDeConfianca'];
    if (!jogosValidos.includes(jogo)) {
      return res.status(400).json({ mensagem: 'Jogo inválido' });
    }

    if (!user.progresso[jogo].concluidos.includes(faseConcluida)) {
      user.progresso[jogo].concluidos.push(faseConcluida);
    }

    // Verificar medalhas (prata = 50%, ouro = 100%)
    const totalFases = { semaforoDoCorpo: 10, toqueBomVsRuim: 11, poderDoNao: 12, adultoDeConfianca: 5 };
    const concluidos = user.progresso[jogo].concluidos.length;
    const total      = totalFases[jogo];

    const medalha_prata = `${jogo}_prata`;
    const medalha_ouro  = `${jogo}_ouro`;

    if (concluidos >= Math.ceil(total * 0.5) && !user.medalhas.includes(medalha_prata)) {
      user.medalhas.push(medalha_prata);
    }
    if (concluidos >= total) {
      if (!user.medalhas.includes(medalha_prata)) user.medalhas.push(medalha_prata);
      if (!user.medalhas.includes(medalha_ouro))  user.medalhas.push(medalha_ouro);
    }

    await user.save();
    res.json({ progresso: user.progresso, medalhas: user.medalhas });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar progresso', erro: error.message });
  }
};

exports.atualizarAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

    user.crianca.avatar = avatar;
    await user.save();
    res.json({ crianca: user.crianca });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao atualizar avatar', erro: error.message });
  }
};
