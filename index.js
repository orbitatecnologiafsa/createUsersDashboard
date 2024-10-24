const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const saltRounds = 10;
// Middleware para processar JSON no corpo da requisição
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Criação de um pool de conexões com o banco de dados
const pool = mysql.createPool({
  host: '193.203.175.133', // substitua pelo seu host
  user: 'u585686210_root',         // substitua pelo nome de usuário
  password: 'Vagalume@2024',       // substitua pela sua senha
  database: 'u585686210_DashboardDB', // substitua pelo nome do banco de dados
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/users', (req, res) => {
  const { empresa, cnpj, password } = req.body;



  if (!empresa || !cnpj || !password) {
    return res.status(400).send('Por favor, preencha todos os campos.');
  }

  const hash = bcrypt.hashSync(password, saltRounds);
  

  const sql = 'INSERT INTO empresas (empresa, cnpj, password) VALUES (?, ?, ?)';
  
  // Executa a consulta usando o pool de conexões
  pool.query(sql, [empresa, cnpj, hash], (err) => {
    if (err) {
      console.error('Erro ao inserir dados no banco:', err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });  
});

// Inicializa o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
