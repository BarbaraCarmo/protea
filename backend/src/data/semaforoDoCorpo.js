module.exports = {
  titulo: 'Semáforo do Corpo',
  descricao: 'Classifique as partes do corpo como verde, amarelo ou vermelho, como um semáforo!',
  icone: 'traffic-light',
  categorias: {
    verde: { cor: '#4CAF50', descricao: 'Áreas ok de serem tocadas por outras pessoas' },
    amarelo: { cor: '#FFC107', descricao: 'Atenção ao contexto, tome cuidado' },
    vermelho: { cor: '#F44336', descricao: 'Áreas íntimas, outros não podem tocar' },
  },
  fases: [
    {
      id: 1,
      parteDoCorpo: 'Braços',
      imagem: 'bracos',
      respostaCorreta: 'verde',
      feedbacks: {
        correto: 'Isso aí! Os braços são uma área segura!',
        verdeParaOutro: 'Essa parte do corpo não é perigosa de ser tocada, mas se estiver desconfortável lembre-se de estabelecer seus limites. Você não está sozinho e seu corpo é seu!',
        outroParaVerde: 'Cuidado! Essa área do seu corpo não deve ser tocada por qualquer um. Vamos tentar de novo?',
      },
    },
    {
      id: 2,
      parteDoCorpo: 'Cabeça',
      imagem: 'cabeca',
      respostaCorreta: 'verde',
      feedbacks: {
        correto: 'Muito bem! A cabeça é uma área segura!',
        verdeParaOutro: 'Essa parte do corpo não é perigosa de ser tocada, mas se estiver desconfortável lembre-se de estabelecer seus limites. Você não está sozinho e seu corpo é seu!',
        outroParaVerde: 'Cuidado! Essa área do seu corpo não deve ser tocada por qualquer um. Vamos tentar de novo?',
      },
    },
    {
      id: 3,
      parteDoCorpo: 'Ombros',
      imagem: 'ombros',
      respostaCorreta: 'verde',
      feedbacks: {
        correto: 'Correto! Os ombros são uma área segura!',
        verdeParaOutro: 'Essa parte do corpo não é perigosa de ser tocada, mas se estiver desconfortável lembre-se de estabelecer seus limites. Você não está sozinho e seu corpo é seu!',
        outroParaVerde: 'Cuidado! Essa área do seu corpo não deve ser tocada por qualquer um. Vamos tentar de novo?',
      },
    },
    {
      id: 4,
      parteDoCorpo: 'Parte superior das costas',
      imagem: 'costas',
      respostaCorreta: 'verde',
      feedbacks: {
        correto: 'Isso mesmo! As costas (parte de cima) são uma área segura!',
        verdeParaOutro: 'Essa parte do corpo não é perigosa de ser tocada, mas se estiver desconfortável lembre-se de estabelecer seus limites. Você não está sozinho e seu corpo é seu!',
        outroParaVerde: 'Cuidado! Essa área do seu corpo não deve ser tocada por qualquer um. Vamos tentar de novo?',
      },
    },
    {
      id: 5,
      parteDoCorpo: 'Joelhos e coxas',
      imagem: 'joelhos',
      respostaCorreta: 'amarelo',
      feedbacks: {
        correto: 'Boa! Joelhos e coxas precisam de atenção ao contexto!',
        verdeParaOutro: 'Essa parte do corpo não é perigosa de ser tocada, mas se estiver desconfortável lembre-se de estabelecer seus limites. Você não está sozinho e seu corpo é seu!',
        outroParaVerde: 'Cuidado! Essa área do seu corpo não deve ser tocada por qualquer um. Vamos tentar de novo?',
      },
    },
    {
      id: 6,
      parteDoCorpo: 'Barriga',
      imagem: 'barriga',
      respostaCorreta: 'amarelo',
      feedbacks: {
        correto: 'Isso! A barriga é uma região que precisa de atenção!',
        verdeParaOutro: 'Essa parte do corpo não é perigosa de ser tocada, mas se estiver desconfortável lembre-se de estabelecer seus limites. Você não está sozinho e seu corpo é seu!',
        outroParaVerde: 'Cuidado! Essa área do seu corpo não deve ser tocada por qualquer um. Vamos tentar de novo?',
      },
    },
    {
      id: 7,
      parteDoCorpo: 'Pés e mãos',
      imagem: 'pes_maos',
      respostaCorreta: 'amarelo',
      feedbacks: {
        correto: 'Muito bem! Pés e mãos dependem do contexto!',
        verdeParaOutro: 'Essa parte do corpo não é perigosa de ser tocada, mas se estiver desconfortável lembre-se de estabelecer seus limites. Você não está sozinho e seu corpo é seu!',
        outroParaVerde: 'Cuidado! Essa área do seu corpo não deve ser tocada por qualquer um. Vamos tentar de novo?',
      },
    },
    {
      id: 8,
      parteDoCorpo: 'Bumbum',
      imagem: 'bumbum',
      respostaCorreta: 'vermelho',
      feedbacks: {
        correto: 'Correto! O bumbum é uma área íntima. Ninguém deve tocar!',
        verdeParaOutro: 'Essa parte do corpo não é perigosa de ser tocada, mas se estiver desconfortável lembre-se de estabelecer seus limites. Você não está sozinho e seu corpo é seu!',
        outroParaVerde: 'Cuidado! Essa área do seu corpo não deve ser tocada por qualquer um. Vamos tentar de novo?',
      },
    },
    {
      id: 9,
      parteDoCorpo: 'Boca',
      imagem: 'boca',
      respostaCorreta: 'vermelho',
      feedbacks: {
        correto: 'Isso mesmo! A boca é uma área íntima!',
        verdeParaOutro: 'Essa parte do corpo não é perigosa de ser tocada, mas se estiver desconfortável lembre-se de estabelecer seus limites. Você não está sozinho e seu corpo é seu!',
        outroParaVerde: 'Cuidado! Essa área do seu corpo não deve ser tocada por qualquer um. Vamos tentar de novo?',
      },
    },
    {
      id: 10,
      parteDoCorpo: 'Partes íntimas',
      imagem: 'partes_intimas',
      respostaCorreta: 'vermelho',
      feedbacks: {
        correto: 'Perfeito! As partes íntimas são só suas! Ninguém pode tocar!',
        verdeParaOutro: 'Essa parte do corpo não é perigosa de ser tocada, mas se estiver desconfortável lembre-se de estabelecer seus limites. Você não está sozinho e seu corpo é seu!',
        outroParaVerde: 'Cuidado! Essa área do seu corpo não deve ser tocada por qualquer um. Vamos tentar de novo?',
      },
    },
  ],
};
