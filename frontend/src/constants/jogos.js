import { COLORS } from './colors';

export const COR_PRATA = '#A8A9AD';
export const COR_OURO  = '#FFD700';

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
 */
export function normalizarMedalhas(medalhas = []) {
  const normalizadas = new Set(medalhas.map((m) => LEGADO_PARA_OURO[m] ?? m));

  JOGOS_CONFIG.forEach(({ medalha_prata, medalha_ouro }) => {
    if (normalizadas.has(medalha_ouro)) {
      normalizadas.add(medalha_prata);
    }
  });

  return [...normalizadas];
}

export const JOGOS_CONFIG = [
  {
    id:             'semaforoDoCorpo',
    titulo:         'Semáforo do Corpo',
    tituloMedalha:  'Mestre do Semáforo',
    icone:          'ellipse',
    cor:            COLORS.verde,
    totalFases:     10,
    medalha_prata:  'semaforoDoCorpo_prata',
    medalha_ouro:   'semaforoDoCorpo_ouro',
  },
  {
    id:             'toqueBomVsRuim',
    titulo:         'Toque Bom vs Toque Ruim',
    tituloMedalha:  'Guardião dos Toques',
    icone:          'hand-left-outline',
    cor:            COLORS.secondary,
    totalFases:     11,
    medalha_prata:  'toqueBomVsRuim_prata',
    medalha_ouro:   'toqueBomVsRuim_ouro',
  },
  {
    id:             'poderDoNao',
    titulo:         'O Poder do Não',
    tituloMedalha:  'Poder do Não',
    icone:          'hand-right-outline',
    cor:            COLORS.accent,
    totalFases:     12,
    medalha_prata:  'poderDoNao_prata',
    medalha_ouro:   'poderDoNao_ouro',
  },
  {
    id:             'adultoDeConfianca',
    titulo:         'Adultos de Confiança',
    tituloMedalha:  'Rede de Confiança',
    icone:          'people-outline',
    cor:            COLORS.warm,
    totalFases:     5,
    medalha_prata:  'adultoDeConfianca_prata',
    medalha_ouro:   'adultoDeConfianca_ouro',
  },
];
