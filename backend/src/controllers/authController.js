const jwt = require('jsonwebtoken');
const User = require('../models/User');

const gerarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.cadastrar = async (req, res) => {
  try {
    const { responsavel, senha, crianca } = req.body;

    const existente = await User.findOne({ 'responsavel.email': responsavel.email });
    if (existente) {
      return res.status(400).json({ mensagem: 'Email já cadastrado' });
    }

    const user = await User.create({ responsavel, senha, crianca });
    res.status(201).json({
      _id: user._id,
      responsavel: user.responsavel,
      crianca: user.crianca,
      token: gerarToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar', erro: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ 'responsavel.email': email });

    if (!user || !(await user.compararSenha(senha))) {
      return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
    }

    res.json({
      _id: user._id,
      responsavel: user.responsavel,
      crianca: user.crianca,
      progresso: user.progresso,
      medalhas: user.medalhas,
      token: gerarToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao fazer login', erro: error.message });
  }
};
