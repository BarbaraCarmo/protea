export const corPrata = '#A8A9AD';
export const corOuro  = '#E8C87A';

/**
 * Garante que quem tem medalha de ouro também tem prata (50% vem antes de 100%).
 */
export function normalizarMedalhas(medalhas = [], catalogo = []) {
  const normalizadas = new Set(medalhas);

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
