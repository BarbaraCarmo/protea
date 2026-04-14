# Protea

Este trabalho apresenta o desenvolvimento do Protea, um aplicativo mobile educativo que utiliza jogos interativos para ensinar educação sexual a crianças de 6 a 11 anos com Transtorno do Espectro Autista (TEA). O aplicativo aborda temas como limites corporais, identificação de toques seguros e inseguros, assertividade e reconhecimento de adultos de confiança, utilizando linguagem acessível, recursos de áudio humanizado e uma interface visual de baixo estímulo. Desenvolvido com React Native, Node.js e MongoDB, o app foi projetado para ser utilizado via Expo Go. A proposta visa preencher uma lacuna na disponibilidade de ferramentas tecnológicas adaptadas ao público com TEA no contexto da prevenção de violência sexual infantil.

Trata-se de uma pesquisa aplicada, de natureza qualitativa, com abordagem de desenvolvimento tecnológico. A metodologia adota o ciclo de desenvolvimento de software com etapas de análise de requisitos, projeto, implementação e documentação.

---

## Arquitetura do Sistema

O sistema adota uma arquitetura cliente-servidor com:

- **Frontend (Cliente)**: React Native com Expo, permitindo execução multiplataforma (Android/iOS) via Expo Go
- **Backend (Servidor)**: Node.js com Express.js, fornecendo API RESTful — publicado no Railway
- **Banco de Dados**: MongoDB Atlas (cloud) — banco de dados NoSQL orientado a documentos
- **Autenticação**: JSON Web Tokens (JWT) para gerenciamento de sessões

---

## Como rodar o app

### Pré-requisitos

1. **Node.js** (versão 18 ou superior): https://nodejs.org/
2. **Expo Go** no celular:
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   - iOS: https://apps.apple.com/app/expo-go/id982107779

---

### Modo 1 — Backend publicado no Railway (recomendado)

O backend já está publicado em `https://protea-production.up.railway.app`.
Neste modo você só precisa rodar o frontend — sem instalar ou configurar o backend localmente.

**Passo 1: Instalar dependências do frontend**

```bash
cd frontend
npm install
```

**Passo 2: Confirmar a URL da API**

O arquivo `frontend/.env` já deve conter:

```env
EXPO_PUBLIC_API_URL=https://protea-production.up.railway.app/api
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

> Para testar sem precisar da mesma rede Wi-Fi, use o modo tunnel (requer ngrok authtoken):
> ```bash
> NGROK_AUTHTOKEN=SEU_TOKEN npx expo start --tunnel --clear
> ```
> Consulte `EXPO_COMPARTILHAR_APP.md` para o passo a passo completo de configuração do tunnel.

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

## Documentação complementar

| Arquivo | Conteúdo |
|---|---|
| `DEPLOY_RAILWAY.md` | Passo a passo completo do deploy no Railway (já realizado) |
| `EXPO_COMPARTILHAR_APP.md` | Como compartilhar o app sem precisar da mesma rede Wi-Fi |
| `ARTIGO_PROTEA.md` | Artigo científico do TCC |
| `QUESTOES_DOS_JOGOS.md` | Questões e dinâmicas dos jogos educativos |
