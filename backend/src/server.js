require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

const authRoutes = require('./routes/auth');
const progressoRoutes = require('./routes/progresso');
const jogosRoutes = require('./routes/jogos');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/progresso', progressoRoutes);
app.use('/api/jogos', jogosRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mensagem: 'Servidor Protea rodando!' });
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});
