require('dotenv').config();
const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// CADASTRO
app.post('/api/cadastro', async (req, res) => {
  const nome = (req.body.nome || '').trim();
  const email = (req.body.email || '').trim().toLowerCase();
  const senha = req.body.senha || '';

  if (!nome || !email || senha.length < 6) {
    return res.status(400).json({ erro: 'Preencha nome, e-mail e uma senha de pelo menos 6 caracteres.' });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    db.prepare('INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)')
      .run(nome, email, senhaHash);
    res.status(201).json({ mensagem: 'Conta criada com sucesso!' });
  } catch (e) {
    if (e.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return res.status(409).json({ erro: 'Este e-mail já está cadastrado.' });
    }
    console.error(e);
    res.status(500).json({ erro: 'Erro interno. Tente novamente.' });
  }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  const email = (req.body.email || '').trim().toLowerCase();
  const senha = req.body.senha || '';

  const usuario = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email);
  const ok = usuario && await bcrypt.compare(senha, usuario.senha_hash);
  if (!ok) {
    return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
  }

  const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.json({ token, nome: usuario.nome });
});

// ROTA PROTEGIDA (para testar se o login vale)
app.get('/api/me', (req, res) => {
  const token = (req.headers.authorization || '').split(' ')[1];
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const u = db.prepare('SELECT id, nome, email FROM usuarios WHERE id = ?').get(id);
    res.json(u);
  } catch {
    res.status(401).json({ erro: 'Sessão inválida ou expirada.' });
  }
});

app.listen(3000, () => console.log('Rodando em http://localhost:3000'));