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

    // Verificar medalhas
    const totalFases = { semaforoDoCorpo: 10, toqueBomVsRuim: 11, poderDoNao: 12, adultoDeConfianca: 5 };
    const nomeMedalha = {
      semaforoDoCorpo: 'Mestre do Semáforo',
      toqueBomVsRuim: 'Guardião dos Toques',
      poderDoNao: 'Poder do Não',
      adultoDeConfianca: 'Rede de Confiança',
    };

    if (user.progresso[jogo].concluidos.length >= totalFases[jogo]) {
      if (!user.medalhas.includes(nomeMedalha[jogo])) {
        user.medalhas.push(nomeMedalha[jogo]);
      }
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
