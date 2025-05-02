import { Router } from 'express';
import db from '../database/db';
import { Usuario } from '../models/Usuario';

const router = Router();

// Listar usuários
router.get('/', (req, res) => {
  db.all<Usuario[]>('SELECT id, nome, email, senha FROM usuarios', [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

// Cadastrar usuário
router.post('/', (req, res) => {
  const { nome, email, senha } = req.body as Usuario;
  db.run(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
    [nome, email, senha],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

export default router;