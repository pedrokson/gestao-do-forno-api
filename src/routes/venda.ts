import { Router } from 'express';
import db from '../database/db';
import { Venda } from '../models/Venda';

const router = Router();

router.get('/', (req, res) => {
  db.all<Venda[]>(
    `SELECT id, produto_id, quantidade, valor_total, data_venda, cliente_id, forma_pagamento FROM sales`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json(rows);
    }
  );
});

router.post('/', (req, res) => {
  const { produtoId, quantidade, valorTotal, dataVenda, clienteId, forma_pagamento } = req.body as Venda;

  db.get<{ estoque: number }>('SELECT estoque FROM produtos WHERE id = ?', [produtoId], (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (!row) return res.status(404).json({ erro: 'Produto não encontrado.' });

    if (row.estoque < quantidade) {
      return res.status(400).json({ erro: 'Estoque insuficiente para realizar a venda.' });
    }

    db.run(
      `INSERT INTO sales (produto_id, quantidade, valor_total, data_venda, cliente_id, forma_pagamento)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [produtoId, quantidade, valorTotal, dataVenda, clienteId, forma_pagamento],
      function (err) {
        if (err) return res.status(500).json({ erro: err.message });

        db.run(
          'UPDATE produtos SET estoque = estoque - ? WHERE id = ?',
          [quantidade, produtoId],
          (err2) => {
            if (err2) return res.status(500).json({ erro: err2.message });
            res.status(201).json({ id: this.lastID });
          }
        );
      }
    );
  });
});

export default router;
