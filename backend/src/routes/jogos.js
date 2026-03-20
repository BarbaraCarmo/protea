const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getSemaforoDoCorpo,
  getToqueBomVsRuim,
  getPoderDoNao,
  getAdultosDeConfianca,
} = require('../controllers/jogosController');

router.get('/semaforo', auth, getSemaforoDoCorpo);
router.get('/toque', auth, getToqueBomVsRuim);
router.get('/poder-do-nao', auth, getPoderDoNao);
router.get('/adultos-confianca', auth, getAdultosDeConfianca);

module.exports = router;
