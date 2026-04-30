<p align="center">
  <img src="https://github.com/user-attachments/assets/558ffbba-8e9d-4071-bf0e-2c5e4cb17848" alt="Logo Protea"  width="163" height="238">
</p>
<h1 align="center">Protea</h1>

Este trabalho apresenta o desenvolvimento do Protea, um aplicativo mobile educativo que utiliza jogos interativos para ensinar educação sexual a crianças de 6 a 11 anos com Transtorno do Espectro Autista (TEA). O aplicativo aborda temas como limites corporais, identificação de toques seguros e inseguros, assertividade e reconhecimento de adultos de confiança, utilizando linguagem acessível, narração em áudio por fase (`expo-audio`), ilustrações contextualizadas (incluindo imagens por pergunta em **Adultos de Confiança** e por parte do corpo em **Semáforo do Corpo**) e uma interface visual de baixo estímulo. Há tela de introdução por jogo, feedback após cada resposta, progresso persistido, medalhas de prata e ouro (exibidas como imagens no perfil e na conclusão dos jogos) e autenticação com perfil da criança. Desenvolvido com React Native (Expo SDK 54), Node.js e MongoDB, o app pode ser executado com **Expo Go** em desenvolvimento ou distribuído como build nativo via **EAS Build** (por exemplo, APK Android com o pacote `com.barbaracarmo.protea`). A proposta visa preencher uma lacuna na disponibilidade de ferramentas tecnológicas adaptadas ao público com TEA no contexto da prevenção de violência sexual infantil.

Trata-se de uma pesquisa aplicada, de natureza qualitativa, com abordagem de desenvolvimento tecnológico. A metodologia adota o ciclo de desenvolvimento de software com etapas de análise de requisitos, projeto, implementação e documentação.

---

## Arquitetura do Sistema

O sistema adota uma arquitetura cliente-servidor com:

- **Frontend (Cliente)**: React Native com Expo (SDK 54), React Navigation, `expo-audio` para narração das questões e `AsyncStorage`/contexto para sessão e progresso; execução em desenvolvimento via Expo Go ou build de produção/preview via EAS (`frontend/eas.json`, `frontend/app.json`)
- **Backend (Servidor)**: Node.js com Express.js, fornecendo API RESTful — publicado no Render.com
- **Banco de Dados**: MongoDB Atlas (cloud) — banco de dados NoSQL orientado a documentos
- **Autenticação**: JSON Web Tokens (JWT) para gerenciamento de sessões

### Jogos e conteúdo (API + app)

| Jogo | Fases | Destaque na interface |
|------|------|------------------------|
| Semáforo do Corpo | 10 | Ilustração por parte do corpo; classificação verde / amarelo / vermelho |
| Toque Bom vs Toque Ruim | 11 | Ilustração por cenário (`imagemPorChave`) |
| O Poder do Não | 12 | Ilustração por situação (`imagemPorChave`) |
| Adultos de Confiança | 10 | Ilustração por pergunta (`assets/jogos/adultos`) + escolha única ou múltipla |

Os textos e estrutura das fases vêm do backend (`backend/src/data/`); imagens e áudios são resolvidos no app em `frontend/src/constants/imagemAssets.js` e `frontend/src/constants/audioAssets.js`. Áudios de narração estão organizados em pastas por jogo (por exemplo `frontend/assets/audio/adultos/`, `semaforo/`, `toque/`, `poder/`) e instruções introdutórias em `frontend/assets/audio/intro/`.

## Como rodar

### Pré-requisitos

1. **Node.js** (versão 18 ou superior): https://nodejs.org/
2. **Expo Go** no celular:
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   - iOS: https://apps.apple.com/app/expo-go/id982107779

---

### Backend publicado no Render

O backend está publicado em `https://protea.onrender.com` (Render.com — plano gratuito sem prazo de expiração).
Neste modo você só precisa rodar o frontend — sem instalar ou configurar o backend localmente.

> **Cold start:** o servidor "dorme" após 15 minutos sem uso. Se o app demorar para responder na primeira abertura, aguarde cerca de 50 segundos. Para apresentações e demos, acesse `https://protea.onrender.com/api/health` no browser um minuto antes para acordar o servidor.

**Passo 1: Instalar dependências do frontend**

```bash
cd frontend
npm install
```

**Passo 2: Confirmar a URL da API**

O arquivo `frontend/.env` já deve conter:

```env
EXPO_PUBLIC_API_URL=https://protea.onrender.com/api
```

Se o arquivo não existir, crie-o com esse conteúdo.

**Passo 3: Iniciar o frontend**

```bash
npx expo start --clear
```

> O `--clear` limpa o cache do Metro e garante que as variáveis de ambiente do `.env` sejam recarregadas corretamente.

**Passo 4: Abrir no celular**

- **Mesma rede Wi-Fi que o PC:** escaneie o QR code no terminal — no **Android** use o app **Expo Go** (Play Store) e o leitor de QR dentro dele; no **iOS** pode usar a **Câmera** do sistema ou o Expo Go (**Scan QR code**).
- Os dois precisam estar na **mesma rede Wi-Fi** que o computador.

**Testes com participantes em outra rede ou sem Wi-Fi compartilhado (Android ou iOS)** — recomendado para avaliações de usabilidade e demos remotas:

```bash
npx expo start --tunnel --clear
```

Com o **tunnel** ativo, o QR code funciona **no Android e no iPhone**: instale o **Expo Go**, abra no Android **Scan QR code** / **Projects** conforme a versão do app, e escaneie o código do terminal (também é possível enviar o link `exp://...` por mensagem — ver `EXPO_COMPARTILHAR_APP.md`). Configure `NGROK_AUTHTOKEN` no `frontend/.env`.

---

## Build nativo com EAS (Android / iOS)

Para gerar instalável fora do Expo Go (por exemplo APK ou AAB para testes internos), use o [EAS Build](https://docs.expo.dev/build/introduction/) a partir da pasta do app:

```bash
cd frontend
npm install
eas login
# Com eas-cli global (npm install -g eas-cli):
eas build --profile preview --platform android
# Ou, sem instalar globalmente (pacote correto é eas-cli, não "eas"):
# npx eas-cli build --profile preview --platform android
```

Os perfis estão em `frontend/eas.json` (`development`, `preview`, `production`). O **application id** Android configurado no projeto é `com.barbaracarmo.protea`. Consulte a documentação da Expo para credenciais, fila de build e assinatura.

---

## Estrutura do repositório (resumo)

```
protea/
├── backend/          # API Express, dados dos jogos, autenticação
├── frontend/         # App Expo (comandos `expo` / `eas` sempre nesta pasta)
│   ├── assets/       # Imagens, áudios, medalhas, ilustrações dos jogos
│   ├── src/          # Telas, componentes, serviços, estilos, constantes
│   ├── app.json      # Configuração Expo (ícone, splash, Android, plugins)
│   └── eas.json      # Perfis de build EAS
└── README.md
```