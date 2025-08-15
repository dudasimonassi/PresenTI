# 📲 PresenTI 📲 
Aplicativo mobile para registro de frequência acadêmica via leitura de QR Code, desenvolvido em React Native com Expo e TypeScript.

📌 Descrição do Projeto <br>
O PresenTI permite que alunos registrem a presença em sala de aula escaneando um QR Code gerado pelo sistema backend. <br>
O app envia os dados de matrícula e a senha do QR Code para um endpoint REST, registra a presença e retorna a confirmação. <br>
O aluno também pode consultar sua situação de faltas e visualizar a lista dos alunos presentes na aula do dia diretamente pelo aplicativo. <br> <br>

🚀 Funcionalidades <br>
- Leitura de QR Code para registrar presença; <br> 
- Persistência local da matrícula do aluno no dispositivo; <br>
- Envio seguro dos dados para um endpoint REST; <br>
- Confirmação do registro de presença; <br>
- Exibição das faltas do aluno; <br>
- Visualização da lista de alunos presentes na aula do dia; <br> <br>


🛠️ Tecnologias Utilizadas <br>
- Expo (React Native) <br>
- JavaScript (Async/Await, Fetch/Ajax) <br>
- State Management (useState/useEffect) <br>
- AsyncStorage (persistência local) <br>
- Expo Cameras e BarCodeScanner <br>

📦 Instalação e Execução
Pré-requisitos
- Node.js instalado
- Expo CLI instalado globalmente: <br> 
``` npm install -g expo-cli ``` <br> 
- Aplicativo Expo Go no seu celular (Android/iOS)

Como rodar o projeto
- Clone este repositório: <br> 
``` git clone https://github.com/dudasimonassi/PresenTI``` <br>

- Acesse a pasta do projeto: <br> 
``` cd seu-repositorio ``` <br>

- Instale as dependências: <br> 
``` npm install ``` <br> 

- Inicie o projeto: <br>
``` expo start ``` <br>

- Escaneie o QR Code exibido no terminal com o app Expo Go. <br> <br>

📄 Licença <br>
Este projeto é destinado exclusivamente a fins acadêmicos.
