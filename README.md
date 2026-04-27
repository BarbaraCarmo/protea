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

### Modo 1 — Backend publicado no Render (recomendado)

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

- Escaneie o QR Code com o Expo Go (Android) ou com a câmera (iOS)
- O celular precisa estar na **mesma rede Wi-Fi** que o computador

> Para testar sem precisar da mesma rede Wi-Fi, use o modo tunnel (requer ngrok configurado):
> ```bash
> npx expo start --tunnel --clear
> ```
> O `NGROK_AUTHTOKEN` já está configurado no `frontend/.env`. Consulte `EXPO_COMPARTILHAR_APP.md` para o passo a passo completo de configuração do ngrok e do tunnel.

---

### Modo 2 — Backend local (desenvolvimento)

Use este modo se precisar modificar o backend e testar as alterações localmente.

**Passo 1: Configurar o backend**

```bash
cd backend
npm install
```

Certifique-se de que o arquivo `backend/.env` existe com o conteúdo:

```env
PORT=3000
MONGODB_URI=mongodb+srv://Cluster50150:clusterProtea@cluster50150.9wqlals.mongodb.net/protea?retryWrites=true&w=majority
JWT_SECRET=protea_jwt_2026_chave_segura_tcc
```

**Passo 2: Iniciar o backend**

```bash
npm run dev
```

Você verá:
```
MongoDB conectado: cluster50150.9wqlals.mongodb.net
Servidor rodando na porta 3000
```

**Passo 3: Apontar o frontend para o backend local**

Descubra o IP do seu computador na rede local:
- **Mac**: `ifconfig | grep "inet "` (procure o IP que começa com `192.168.x.x`)
- **Windows**: `ipconfig` (procure IPv4 Address)

Edite `frontend/.env`:

```env
EXPO_PUBLIC_API_URL=http://192.168.x.x:3000/api
```

**Passo 4: Iniciar o frontend**

```bash
cd frontend
npm install
npx expo start
```

---

## Build nativo com EAS (Android / iOS)

Para gerar instalável fora do Expo Go (por exemplo APK ou AAB para testes internos), use o [EAS Build](https://docs.expo.dev/build/introduction/) a partir da pasta do app:

```bash
cd frontend
npm install
# eas-cli instalado globalmente ou: npx eas-cli build ...
eas login
eas build --profile preview --platform android
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

Documentação complementar no repositório (quando aplicável): compartilhamento e túnel Expo (`EXPO_COMPARTILHAR_APP.md`), deploy do backend (`DEPLOY_RENDER.md`).