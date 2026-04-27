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
  adultoDeConfianca: require('../../assets/cards/adultosDeConfiancaIlustracao.png'),
  // toqueBomVsRuim  — usa imagemPorChave por fase, sem arte estática
  // poderDoNao      — usa imagemPorChave por fase, sem arte estática
  // semaforoDoCorpo — usa imagemSemaforo por fase
};

// Adultos de Confiança — ilustração por fase (chave = fase.id do backend)
export const imagemAdultosConfiancaPorFase = {
  1: require('../../assets/jogos/adultos/criancaCercadaDaFamilia.png'),
  2: require('../../assets/jogos/adultos/criancaIrritada.png'),
  3: require('../../assets/jogos/adultos/falandoComAdulto.png'),
  4: require('../../assets/jogos/adultos/criancaCercadaDaFamilia.png'),
  5: require('../../assets/jogos/adultos/conversandoComProfessora.png'),
  6: require('../../assets/jogos/adultos/carinhoNaCabeca.png'),
  7: require('../../assets/jogos/adultos/falandoComAdulto.png'),
  8: require('../../assets/jogos/adultos/duvida.png'),
  9: require('../../assets/jogos/adultos/falandoComAdulto.png'),
  10: require('../../assets/jogos/adultos/criancaHeroi.png'),
};

// ── Ilustrações por fase — Semáforo do Corpo (chave = fase.imagem do backend) ─
export const imagemSemaforo = {
  ombros:        require('../../assets/jogos/semaforo/ombros.png'),
  bumbum:        require('../../assets/jogos/semaforo/bumbum.png'),
  joelhos:       require('../../assets/jogos/semaforo/joelhosEcoxas.png'),
  bracos:        require('../../assets/jogos/semaforo/bracos.png'),
  boca:          require('../../assets/jogos/semaforo/boca.png'),
  barriga:       require('../../assets/jogos/semaforo/barriga.png'),
  cabeca:        require('../../assets/jogos/semaforo/cabeca.png'),
  partes_intimas: require('../../assets/jogos/semaforo/partesIntimas.png'),
  pes_maos:      require('../../assets/jogos/semaforo/pesEmaos.png'),
  costas:        require('../../assets/jogos/semaforo/costas.png'),
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

// ── Medalhas por jogo ─────────────────────────────────────────────────────────
export const imagemMedalha = {
  semaforoDoCorpo:   {
    prata: require('../../assets/medalhas/medalhaPrataSemaforo.png'),
    ouro:  require('../../assets/medalhas/medalhaOuroSemaforo.png'),
  },
  toqueBomVsRuim:    {
    prata: require('../../assets/medalhas/medalhaPrataToque.png'),
    ouro:  require('../../assets/medalhas/medalhaOuroToque.png'),
  },
  poderDoNao:        {
    prata: require('../../assets/medalhas/medalhaPrataPoderDoNao.png'),
    ouro:  require('../../assets/medalhas/medalhaOuroPoderDoNao.png'),
  },
  adultoDeConfianca: {
    prata: require('../../assets/medalhas/medalhaPrataAdultos.png'),
    ouro:  require('../../assets/medalhas/medalhaOuroAdultos.png'),
  },
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

  // ── Poder do Não (assets em jogos/poderDoNao/) ───────────────────────────────
  tia_beijo:          require('../../assets/jogos/poderDoNao/tiaPedindoBeijo.png'),
  amigo_abraco:       require('../../assets/jogos/poderDoNao/criancas-abraco.png'),
  adulto_abraco:      require('../../assets/jogos/poderDoNao/pedindoAbraco.png'),
  adulto_insiste:     require('../../assets/jogos/poderDoNao/insistirPedindoAbraco.png'),
  adulto_presente:    require('../../assets/jogos/poderDoNao/presente.png'),
  adulto_doce:        require('../../assets/jogos/poderDoNao/oferecendoDoces.png'),
  familiar_colo:      require('../../assets/jogos/poderDoNao/sentarNoColo.png'),
  familiar_insiste:   require('../../assets/jogos/poderDoNao/insistirSentarNoColo.png'),
  colega_brincadeira: require('../../assets/jogos/poderDoNao/brincadeira-mal-gosto.png'),
  colega_insiste:     require('../../assets/jogos/poderDoNao/crianca-implicando.png'),
  adulto_ameaca:      require('../../assets/jogos/poderDoNao/silencio.png'),
  adulto_sozinho:     require('../../assets/jogos/poderDoNao/sozinhoComAdulto.png'),
};
