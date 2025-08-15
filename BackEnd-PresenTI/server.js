const express = require('express');
const cors = require('cors');
const QRCode = require('qrcode');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let presencas = []; 
let ultimoToken = null; 

function formatarDataAgora() {
  const data = new Date();
  const dia = ('0' + data.getDate()).slice(-2);
  const mes = ('0' + (data.getMonth() + 1)).slice(-2);
  const ano = data.getFullYear();
  const hora = ('0' + data.getHours()).slice(-2);
  const minuto = ('0' + data.getMinutes()).slice(-2);
  return `${dia}/${mes}/${ano} - ${hora}:${minuto}`;
}

// -------------------
// GERA QR CODE
// -------------------
app.get('/api/qrcode', async (req, res) => {
  try {
    const token = `token-presenca-${Date.now()}`;
    ultimoToken = token; // salva o último token gerado
    const qrCodeDataUrl = await QRCode.toDataURL(token);
    res.json({ sucesso: true, token, qrCodeDataUrl });
  } catch (error) {
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao gerar QR Code.' });
  }
});

// -------------------
// REGISTRA PRESENÇA
// -------------------
app.post('/api/presenca', (req, res) => {
  const { matricula, senha } = req.body;

  if (!matricula || !senha) {
    return res.status(400).json({ sucesso: false, mensagem: 'Matrícula e senha obrigatórias.' });
  }

  // Impede registro duplicado para o mesmo QR Code
  const jaRegistrado = presencas.some(
    p => p.matricula === matricula && p.senha === senha
  );

  if (jaRegistrado) {
    return res.status(400).json({ sucesso: false, mensagem: 'Presença já registrada para este QR Code.' });
  }

  const registro = {
    matricula,
    senha, 
    datetime: formatarDataAgora(),
  };

  presencas.push(registro);
  console.log('Presença registrada:', registro);

  res.json({ sucesso: true, mensagem: `Presença registrada para matrícula ${matricula}` });
});

// -------------------
// CONSULTA FALTAS DO ALUNO
// -------------------
app.get('/api/faltas/:matricula', (req, res) => {
  const { matricula } = req.params;

  const registros = presencas.filter(p => p.matricula === matricula);
  const presencasUnicas = [...new Set(registros.map(p => p.datetime))]; 

  res.json({ sucesso: true, diasPresenca: presencasUnicas });
});

// -------------------
// FREQUÊNCIA DA TURMA (último QR CODE)
// -------------------
app.get('/api/frequencia', (req, res) => {
  if (!ultimoToken) {
    return res.status(404).json({ sucesso: false, mensagem: 'Nenhum QR Code gerado ainda.' });
  }

  const registrosUltimoToken = presencas.filter(p => p.senha === ultimoToken);
  const matriculasUnicas = [...new Set(registrosUltimoToken.map(p => p.matricula))];

  res.json({ sucesso: true, token: ultimoToken, matriculas: matriculasUnicas });
});

// -------------------
// INICIA SERVIDOR
// -------------------
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
