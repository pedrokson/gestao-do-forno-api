import { Router } from 'express';
import db from '../database/db';
const router = Router();

// Total de vendas do dia
router.get('/vendas-dia', (req, res) => {
  const hoje = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  db.get(
    'SELECT COUNT(*) as total FROM sales WHERE data_venda = ?',
    [hoje],
    (err, row) => {
      if (err) return res.status(500).json({ erro: err.message });
      const {total} = row as {total:number};
      res.json({ total: total });
    }
  );
});

// Faturamento mensal
router.get('/faturamento-mensal', (req, res) => {
  const mesAtual = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  db.get(
   `SELECT SUM(valor_total) as total FROM sales WHERE strftime('%Y-%m', data_venda) = ?`,
    [mesAtual],
    (err, row) => {
      if (err) return res.status(500).json({ erro: err.message });
      const {total} = row as {total:number};
      res.json({ total: total ?? 0 });
    }
  );
});

// Produtos mais vendidos
router.get('/mais-vendidos', (req, res) => {
  db.all(
    `SELECT p.nome, SUM(s.quantidade) as total
     FROM sales s
     JOIN produtos p ON p.id = s.produto_id
     GROUP BY s.produto_id
     ORDER BY total DESC
     LIMIT 5`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json(rows);
    }
  );
});

// Estoque crítico
router.get('/estoque-critico', (req, res) => {
  db.all('SELECT * FROM produtos WHERE estoque <= 5', [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

export default router;