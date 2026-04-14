/**
 * Centralização de todas as strings visíveis ao usuário no app Protea.
 *
 * Organização por contexto:
 *   app        — nome, tagline e textos globais
 *   nav        — títulos de abas e telas da navegação
 *   auth       — login e cadastro
 *   home       — tela inicial
 *   perfil     — tela de perfil
 *   progresso  — tela de progresso
 *   ajuda      — FAQ, Disque 100 e sobre o app
 *   jogos      — textos comuns a todos os jogos
 *   feedback   — modal de feedback de resposta
 *   erros      — mensagens de erro e alertas genéricos
 */

export const strings = {

  // ─── App ────────────────────────────────────────────────────────────────────
  app: {
    nome: 'Protea',
    tagline: 'Aprender brincando, proteger amando',
    versao: 'Versão 1.0.0',
    descricao:
      'Aplicativo educativo que utiliza jogos para ensinar crianças com Transtorno do Espectro ' +
      'Autista (TEA) sobre educação sexual, limites corporais e identificação de situações de risco.',
    contato: 'Contato: babi.carmo@outlook.com',
  },

  // ─── Navegação ──────────────────────────────────────────────────────────────
  nav: {
    tabs: {
      home: 'Início',
      progresso: 'Progresso',
      perfil: 'Perfil',
      ajuda: 'Ajuda',
    },
    jogos: {
      semaforo: 'Semáforo do Corpo',
      toque: 'Toque Bom vs Ruim',
      poderDoNao: 'O Poder do Não',
      adultos: 'Adultos de Confiança',
    },
  },

  // ─── Autenticação ───────────────────────────────────────────────────────────
  auth: {
    login: {
      placeholderEmail: 'Email do responsável',
      placeholderSenha: 'Senha',
      botaoEntrar: 'Entrar',
      linkCadastro: 'Não tem conta?',
      linkCadastroDestaque: 'Cadastre-se',
    },
    cadastro: {
      titulo: 'Criar Conta',
      subtitulo: 'Preencha os dados do responsável e da criança',
      secaoResponsavel: 'Dados do Responsável',
      secaoCrianca: 'Dados da Criança',
      placeholderNomeResponsavel: 'Nome completo',
      placeholderEmail: 'Email',
      placeholderTelefone: 'Telefone',
      placeholderParentesco: 'Grau de parentesco (ex: Mãe, Pai, Avó)',
      placeholderSenha: 'Senha (mínimo 6 caracteres)',
      placeholderConfirmarSenha: 'Confirmar senha',
      placeholderNomeCrianca: 'Nome da criança',
      placeholderDataNascimento: 'Data de nascimento (DD/MM/AAAA)',
      botaoCadastrar: 'Cadastrar',
      linkLogin: 'Já tem uma conta?',
      linkLoginDestaque: 'Entre aqui',
    },
    alertas: {
      tituloAtencao: 'Atenção',
      tituloErro: 'Erro',
      camposObrigatorios: 'Preencha todos os campos.',
      senhasDiferentes: 'As senhas não coincidem.',
      senhaCurta: 'A senha deve ter pelo menos 6 caracteres.',
      dataInvalida: 'Data de nascimento inválida. Use DD/MM/AAAA.',
      erroLogin: 'Erro ao fazer login. Verifique suas credenciais.',
      erroCadastro: 'Erro ao cadastrar. Tente novamente.',
    },
  },

  // ─── Home ───────────────────────────────────────────────────────────────────
  home: {
    saudacao: (nome) => `Olá, ${nome}!`,
    subtitulo: 'Vamos aprender brincando?',
    nomePadrao: 'Amiguinho',
    erroCarregarJogos: 'Não foi possível carregar os jogos agora.',
  },

  // ─── Perfil ─────────────────────────────────────────────────────────────────
  perfil: {
    escolherAvatar: 'Escolha seu avatar',
    medalhas: 'Medalhas conquistadas',
    botaoSair: 'Sair',
    alertaSairTitulo: 'Sair',
    alertaSairMensagem: 'Deseja realmente sair?',
    alertaSairCancelar: 'Cancelar',
    alertaSairConfirmar: 'Sair',
    nomePadrao: 'Amiguinho',
  },

  // ─── Progresso ──────────────────────────────────────────────────────────────
  progresso: {
    fasesConcluidas: (concluidos, total) => `${concluidos} de ${total} fases concluídas`,
    medalhaPrata: 'Prata — 50%',
    medalhaOuro: 'Ouro — 100%',
  },

  // ─── Ajuda ──────────────────────────────────────────────────────────────────
  ajuda: {
    disque100: {
      titulo: 'Disque 100',
      subtitulo: 'Canal de denúncia de violência',
      descricao:
        'Se você suspeita de alguma situação de risco para uma criança, ligue para o Disque 100. ' +
        'O serviço funciona 24 horas e a ligação é gratuita.',
      botao: 'Ligar para o Disque 100',
      alertaTitulo: 'Disque 100',
      alertaMensagem:
        'O Disque 100 é o canal de denúncias de violações de direitos humanos, incluindo violência contra crianças.\n\n' +
        'Ligue gratuitamente: 100\n\n' +
        'Funciona 24 horas, todos os dias.',
      alertaFechar: 'Fechar',
      alertaLigar: 'Ligar agora',
      numero: 'tel:100',
    },
    secaoFaq: 'Perguntas Frequentes',
    secaoSobre: 'Sobre o App',
    faq: [
      {
        pergunta: 'O que é o Protea?',
        resposta:
          'O Protea é um aplicativo educativo que usa jogos para ensinar crianças com TEA sobre educação sexual de forma segura, acessível e lúdica.',
      },
      {
        pergunta: 'Para qual faixa etária é indicado?',
        resposta:
          'O app é indicado para crianças entre 6 e 11 anos, especialmente crianças com Transtorno do Espectro Autista (TEA).',
      },
      {
        pergunta: 'Como funcionam os jogos?',
        resposta:
          'Cada jogo apresenta situações do cotidiano. A criança interage classificando, escolhendo respostas ou identificando situações. O app dá feedback educativo a cada resposta.',
      },
      {
        pergunta: 'Os dados da criança são seguros?',
        resposta:
          'Sim! Coletamos apenas nome e data de nascimento da criança. Todos os dados são protegidos e usados exclusivamente para o funcionamento do app.',
      },
      {
        pergunta: 'Como acompanho o progresso do meu filho?',
        resposta:
          'Na tela de Progresso, você pode ver a porcentagem concluída de cada jogo e as medalhas conquistadas.',
      },
    ],
  },

  // ─── Jogos (textos comuns a todos os módulos) ────────────────────────────────
  jogos: {
    botaoProximo: 'Próxima fase',
    botaoReiniciar: 'Jogar novamente',
    botaoFinalizar: 'Concluir',
    faseLabel: (atual, total) => `Fase ${atual} de ${total}`,
    conclusaoTitulo: 'Parabéns!',
    conclusaoMensagem: 'Você concluiu todas as fases deste jogo!',
  },

  // ─── Modal de Feedback ───────────────────────────────────────────────────────
  feedback: {
    tituloAcerto: 'Muito bem!',
    tituloErro: 'Ops!',
    botaoContinuar: 'Continuar',
    botaoTentarNovamente: 'Tentar de novo',
  },

  // ─── Erros genéricos ─────────────────────────────────────────────────────────
  erros: {
    generico: 'Algo deu errado. Tente novamente.',
    semConexao: 'Sem conexão com o servidor. Verifique sua internet.',
  },
};
