export const corPrata = '#A8A9AD';
export const corOuro  = '#FFD700';

// Mapeamento de nomes legados (formato antigo do backend) para os novos IDs de medalha de ouro.
// Permite que usuários que já tinham medalhas no banco continuem vendo-as corretamente.
const LEGADO_PARA_OURO = {
  'Mestre do Semáforo':    'semaforoDoCorpo_ouro',
  'Guardião dos Toques':   'toqueBomVsRuim_ouro',
  'Poder do Não':          'poderDoNao_ouro',
  'Rede de Confiança':     'adultoDeConfianca_ouro',
};

/**
 * Normaliza a lista de medalhas do usuário:
 * 1. Converte nomes legados para os novos IDs.
 * 2. Garante que quem tem ouro também tem prata (50% vem antes de 100%).
 *
 * @param {string[]} medalhas - medalhas do usuário vindas do backend
 * @param {object[]} catalogo - catálogo de jogos com medalhaPrata e medalhaOuro
 */
export function normalizarMedalhas(medalhas = [], catalogo = []) {
  const normalizadas = new Set(medalhas.map((m) => LEGADO_PARA_OURO[m] ?? m));

  catalogo.forEach(({ medalhaPrata, medalhaOuro }) => {
    if (normalizadas.has(medalhaOuro)) {
      normalizadas.add(medalhaPrata);
    }
  });

  return [...normalizadas];
}

/**
 * Dados puramente visuais de cada jogo — ícone e título da medalha.
 * Informações de negócio (totalFases, medalhaPrata, medalhaOuro, cor, titulo)
 * vêm do catálogo retornado pela API (/jogos).
 */
export const jogosUI = {
  semaforoDoCorpo:   { icone: 'ellipse',           tituloMedalha: 'Mestre do Semáforo' },
  toqueBomVsRuim:    { icone: 'hand-left-outline',  tituloMedalha: 'Guardião dos Toques' },
  poderDoNao:        { icone: 'hand-right-outline', tituloMedalha: 'Poder do Não' },
  adultoDeConfianca: { icone: 'people-outline',     tituloMedalha: 'Rede de Confiança' },
};
