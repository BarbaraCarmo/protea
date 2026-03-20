const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Dados do responsável
  responsavel: {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String, required: true },
    grauParentesco: { type: String, required: true },
  },
  senha: { type: String, required: true },
  // Dados da criança
  crianca: {
    nome: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    avatar: { type: String, default: 'avatar1' },
  },
  // Progresso nos jogos
  progresso: {
    semaforoDoCorpo: { concluidos: { type: [Number], default: [] } },
    toqueBomVsRuim: { concluidos: { type: [Number], default: [] } },
    poderDoNao: { concluidos: { type: [Number], default: [] } },
    adultoDeConfianca: { concluidos: { type: [Number], default: [] } },
  },
  medalhas: { type: [String], default: [] },
}, { timestamps: true });

// Virtual: idade da criança (conforme diagrama de classes)
userSchema.virtual('crianca.idade').get(function () {
  if (!this.crianca?.dataNascimento) return null;
  const hoje = new Date();
  const nasc = new Date(this.crianca.dataNascimento);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
  return idade;
});

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

userSchema.methods.compararSenha = async function (senha) {
  return bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('User', userSchema);
