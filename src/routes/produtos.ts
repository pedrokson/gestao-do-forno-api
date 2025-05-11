import { Router } from 'express';
import db from '../database/db';
import { Produto } from '../models/Produto';

const router = Router();

router.get('/', (req, res) => {
  db.all<Produto[]>('SELECT * FROM produtos', [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  const { nome, preco, estoque, custo_atual, custo_medio, margem, preco_venda } = req.body as Produto;
  db.run(
    'INSERT INTO produtos (nome, preco, estoque, custo_atual, custo_medio, margem, preco_venda) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nome, preco, estoque, custo_atual, custo_medio, margem, preco_venda],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ id: this.lastID });
    }
  );
});

router.put('/:id', (req, res) => {
  const { nome, preco, estoque, custo_atual, custo_medio, margem, preco_venda } = req.body as Produto;
  db.run(
    'UPDATE produtos SET nome = ?, preco = ?, estoque = ? , custo_atual = ?, custo_medio = ?, margem = ?, preco_venda = ? WHERE id = ?',
    [nome, preco, estoque, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ alterado: this.changes });
    }
  );
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM produtos WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ deletado: this.changes });
  });
});

export default router;