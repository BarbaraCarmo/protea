<p align="center">
  <img src="https://github.com/user-attachments/assets/558ffbba-8e9d-4071-bf0e-2c5e4cb17848" alt="Logo Protea"  width="163" height="238">
</p>
<h1 align="center">Protea</h1>

Este trabalho apresenta o desenvolvimento do Protea, um aplicativo mobile educativo que utiliza jogos interativos para ensinar educação sexual a crianças de 6 a 11 anos com Transtorno do Espectro Autista (TEA). O aplicativo aborda temas como limites corporais, identificação de toques seguros e inseguros, assertividade e reconhecimento de adultos de confiança, utilizando linguagem acessível, recursos de áudio humanizado e uma interface visual de baixo estímulo. Desenvolvido com React Native, Node.js e MongoDB, o app foi projetado para ser utilizado via Expo Go, dispensando a publicação em lojas de aplicativos. A proposta visa preencher uma lacuna na disponibilidade de ferramentas tecnológicas adaptadas ao público com TEA no contexto da prevenção de violência sexual infantil.

Trata-se de uma pesquisa aplicada, de natureza qualitativa, com abordagem de desenvolvimento tecnológico. A metodologia adota o ciclo de desenvolvimento de software com etapas de análise de requisitos, projeto, implementação e documentação.

## Arquitetura do Sistema

O sistema adota uma arquitetura cliente-servidor com:

- **Frontend (Cliente)**: React Native com Expo, permitindo execução multiplataforma (Android/iOS) via Expo Go;
- **Backend (Servidor)**: Node.js com Express.js, fornecendo API RESTful;
- **Banco de Dados**: MongoDB, banco de dados NoSQL orientado a documentos;
- **Autenticação**: JSON Web Tokens (JWT) para gerenciamento de sessões;
- **Acessibilidade Auditiva**: Integração planejada com Eleven Labs para geração de áudios humanizados.

## Como rodar

### Pré-requisitos

1. **Node.js** (versão 18 ou superior): https://nodejs.org/
2. **MongoDB** (local ou MongoDB Atlas): https://www.mongodb.com/
3. **Expo Go** no celular:
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   - iOS: https://apps.apple.com/app/expo-go/id982107779
4. **Computador e celular na mesma rede Wi-Fi**

### Passo 1: Instalar Node.js

Baixe e instale o Node.js em https://nodejs.org/ (versão LTS recomendada).

Verifique a instalação:
```bash
node --version
npm --version
```

### Passo 2: Configurar o MongoDB

Garantir que o ip atual está adicionado na Network Access List no MongoDB Atlas.

Rodar

```bash
mongosh "mongodb+srv://cluster50150.9wqlals.mongodb.net/" --apiVersion 1 --username Cluster50150
```

### Passo 3: Iniciar o Backend

```bash
cd backend
npm install
npm run dev
```

O servidor iniciará na porta 3000. Você verá:
```
MongoDB conectado: localhost
Servidor rodando na porta 3000
```

---

### Passo 4: Configurar o IP no Frontend

1. Descubra o IP do seu computador na rede local:
   - **Mac**: Abra o Terminal e digite `ifconfig | grep "inet "` (procure o IP que começa com 192.168.x.x)
   - **Windows**: Abra o CMD e digite `ipconfig` (procure IPv4 Address)

2. Edite o arquivo `frontend/src/services/api.js`:
   ```javascript
   const API_URL = 'http://SEU_IP_AQUI:3000/api';
   ```
   Exemplo: `http://192.168.1.100:3000/api`

---

### Passo 5: Iniciar o Frontend

```bash
cd frontend
npm install
npx expo start
```

Um QR Code aparecerá no terminal.

---

### Passo 6: Abrir no Celular

1. Abra o app **Expo Go** no celular
2. Escaneie o QR Code exibido no terminal
3. O app será carregado automaticamente!

**Importante**: O celular e o computador devem estar conectados na **mesma rede Wi-Fi**.
