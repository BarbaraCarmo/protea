const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getProgresso,
  atualizarProgresso,
  atualizarAvatar,
} = require('../controllers/progressoController');

router.get('/', auth, getProgresso);
router.put('/atualizar', auth, atualizarProgresso);
router.put('/avatar', auth, atualizarAvatar);

module.exports = router;
