/**
 * Fonte única de verdade para todos os assets de imagem do app.
 *
 * Estrutura:
 *   imagemApp      — imagens globais do app (logo, etc.)
 *   imagemCard     — ilustrações dos cards da Home; chaves = imagemKey do catálogo backend
 *   imagemJogo     — arte estática usada dentro de jogos sem ilustração por fase
 *   imagemAvatar   — avatares do perfil da criança
 *   imagemPorChave — ilustrações por fase; chaves = fase.ilustracao / fase.imagem do backend
 *
 * Quando uma imagem ainda não existe, a entrada fica comentada.
 * CardImagem retorna null para source undefined, sem quebrar a tela.
 */

// ── App-level ─────────────────────────────────────────────────────────────────
export const imagemApp = {
  logo: require('../../assets/logo.png'),
};

// ── Cards da Home (imagemKey vindo do catalogoJogos) ──────────────────────────
export const imagemCard = {
  semaforoIlustracao:           require('../../assets/cards/semaforoDoCorpoIlustracao.png'),
  toqueBomToqueRuimIlustracao:  require('../../assets/cards/toqueBomToqueRuimIlustracao.png'),
  poderDoNaoIlustracao:         require('../../assets/cards/poderDoNaoIlustracao.png'),
  adultosDeConfiancaIlustracao: require('../../assets/cards/adultosDeConfiancaIlustracao.png'),
};

// ── Arte estática por jogo (usada quando não há ilustração por fase) ───────────
export const imagemJogo = {
  semaforoDoCorpo:   require('../../assets/jogos/semaforo/boneco.png'),
  adultoDeConfianca: require('../../assets/cards/adultosDeConfiancaIlustracao.png'),
  // toqueBomVsRuim  — usa imagemPorChave por fase, sem arte estática
  // poderDoNao      — usa imagemPorChave por fase, sem arte estática
};

// ── Avatares do perfil da criança ─────────────────────────────────────────────
export const imagemAvatar = {
  brancaLoiraLiso:     require('../../assets/avatares/branca-loira-liso.png'),
  brancaMorenaLiso:    require('../../assets/avatares/branca-morena-liso.png'),
  brancoLoiroLiso:     require('../../assets/avatares/branco-loiro-liso.png'),
  brancoMorenoLiso:    require('../../assets/avatares/branco-moreno-liso.png'),
  negraMorenaCrespo:   require('../../assets/avatares/negra-morena-crespo.png'),
  negraMorenaLiso:     require('../../assets/avatares/negra-morena-liso.png'),
  negroMorenoCrespo:   require('../../assets/avatares/negro-moreno-crespo.png'),
  negroMorenoLiso:     require('../../assets/avatares/negro-moreno-liso.png'),
  pardaMorenaCacheado: require('../../assets/avatares/parda-morena-cacheado.png'),
  pardaMorenaLiso:     require('../../assets/avatares/parda-morena-liso.png'),
  pardoMorenoCacheado: require('../../assets/avatares/pardo-moreno-cacheado.png'),
  pardoMorenoLiso:     require('../../assets/avatares/pardo-moreno-liso.png'),
};

// ── Ilustrações por fase (fase.ilustracao / fase.imagem vindo do backend) ─────
export const imagemPorChave = {
  // ── Toque Bom vs Toque Ruim ────────────────────────────────────────────────
  abraco_avo:      require('../../assets/jogos/toque/abraco-vovo.png'),
  beijo_mae:       require('../../assets/jogos/toque/beijo-boa-noite.png'),
  maos_dadas:      require('../../assets/jogos/toque/atravessando-rua.png'),
  cafune:          require('../../assets/jogos/toque/cafune.png'),
  medico:          require('../../assets/jogos/toque/medico.png'),
  ajuda_vestir:    require('../../assets/jogos/toque/vestindo.png'),
  socorro_joelho:  require('../../assets/jogos/toque/joelho-machucado.png'),
  segredo:         require('../../assets/jogos/toque/silencio.png'),
  presente:        require('../../assets/jogos/toque/presente.png'),
  banheiro:        require('../../assets/jogos/toque/adulto-banheiro.png'),
  beijo_forcado:   require('../../assets/jogos/toque/beijo.png'),

  // ── Poder do Não ──────────────────────────────────────────────────────────
  tia_beijo:          require('../../assets/jogos/poderDoNao/adulto-pedindo-beijo.png'),
  primo_brincadeira:  require('../../assets/jogos/poderDoNao/brincadeira-mal-gosto.png'),
  amigo_abraco:       require('../../assets/jogos/poderDoNao/crianças-abraço.png'),
  adulto_abraco:      require('../../assets/jogos/toque/abraco-vovo.png'),
  // adulto_insiste    — imagem pendente
  colega_brincadeira: require('../../assets/jogos/poderDoNao/criança-implicando.png'),
  colega_insiste:     require('../../assets/jogos/poderDoNao/criança-caçoando-da-outra.png'),
  // familiar_colo     — imagem pendente
  // familiar_insiste  — imagem pendente
  adulto_presente:    require('../../assets/jogos/toque/presente.png'),
  adulto_ameaca:      require('../../assets/jogos/toque/silencio.png'),
  // adulto_sozinho    — imagem pendente
};
