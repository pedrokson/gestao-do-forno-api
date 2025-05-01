import { Router } from 'express';
import db from '../database/db';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = 'chave-secreta-supersegura'; // guarde isso em variável de ambiente idealmente

router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.get('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (err, user: { id: number; email: string } | undefined) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!user) return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });

    // Gera o token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ mensagem: 'Login realizado com sucesso', token });
  });
});