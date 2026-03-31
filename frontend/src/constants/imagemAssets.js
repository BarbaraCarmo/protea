/**
 * Mapeia as chaves que vêm do backend (fase.ilustracao / fase.imagem)
 * para os arquivos PNG locais.
 *
 * Quando uma chave não tiver imagem correspondente ainda, simplesmente
 * não estará listada aqui — a tela lida com o valor undefined (não renderiza nada).
 */
export const imagemPorChave = {
  // ── Toque Bom vs Toque Ruim ──────────────────────────────────────────────
  abraco_avo:      require('../../assets/abraco-vovo.png'),
  beijo_mae:       require('../../assets/beijo-boa-noite.png'),
  maos_dadas:      require('../../assets/atravessando-rua.png'),
  medico:          require('../../assets/medico.png'),
  ajuda_vestir:    require('../../assets/vestindo.png'),
  socorro_joelho:  require('../../assets/joelho-machucado.png'),
  segredo:         require('../../assets/silencio.png'),
  presente:        require('../../assets/presente.png'),
  banheiro:        require('../../assets/adulto-banheiro.png'),
  beijo_forcado:   require('../../assets/beijo.png'),

  // ── Poder do Não ─────────────────────────────────────────────────────────
  tia_beijo:       require('../../assets/beijo.png'),
  amigo_abraco:    require('../../assets/abraco-vovo.png'),
  adulto_abraco:   require('../../assets/abraco-vovo.png'),
  adulto_presente: require('../../assets/presente.png'),
  adulto_ameaca:   require('../../assets/silencio.png'),
};

// Imagens estáticas por jogo (usadas quando não há chave por fase)
export const imagemJogo = {
  semaforoDoCorpo:    require('../../assets/boneco.png'),
  toqueBomVsRuim:     require('../../assets/toqueBomToqueRuimIlustracao.png'),
  poderDoNao:         require('../../assets/poderDoNaoIlustracao.png'),
  adultoDeConfianca:  require('../../assets/adultosDeConfiancaIlustracao.png'),
};
