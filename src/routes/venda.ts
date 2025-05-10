import  { Router } from 'express';
import db from '../database/db';
import { verificarToken } from '../middlewares/auth.middleware';
import { Venda } from '../models/Venda';

const router = Router();

// Listar vendas
router.get('/',  (req, res) => {
    db.all<Venda[]>('SELECT id, produto_id, quantidade, valor_total, data_venda, cliente_id FROM sales', [], (err, rows) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json(rows);
    });
});

// Cadastrar venda
router.post('/',  (req, res) => {
    const { produtoId, quantidade, valorTotal, dataVenda, clienteId } = req.body as Venda;
    db.run(
        'INSERT INTO sales (produto_id, quantidade, valor_total, data_venda, cliente_id) VALUES (?, ?, ?, ?, ?)',
        [produtoId, quantidade, valorTotal, dataVenda, clienteId],
        function (err) {
            if (err) return res.status(500).json({ erro: err.message });

            db.run(
                'UPDATE produtos SET estoque = estoque - ? WHERE id = ?',
                [quantidade, produtoId],
                (updateErr) => {
                    if (updateErr) return res.status(500).json({ erro: updateErr.message });
                }
            )
            res.status(201).json({ id: this.lastID });
        }
    );
});

export default router;
