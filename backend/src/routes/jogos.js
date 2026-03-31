const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getCatalogoJogos,
  getSemaforoDoCorpo,
  getToqueBomVsRuim,
  getPoderDoNao,
  getAdultosDeConfianca,
} = require('../controllers/jogosController');

// Catálogo é público (sem dados sensíveis); fases dos jogos continuam protegidas.
router.get('/', getCatalogoJogos);
router.get('/semaforo', auth, getSemaforoDoCorpo);
router.get('/toque', auth, getToqueBomVsRuim);
router.get('/poder-do-nao', auth, getPoderDoNao);
router.get('/adultos-confianca', auth, getAdultosDeConfianca);

module.exports = router;
