import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import produtosRoutes from './routes/produtos';
import usuariosRoutes from './routes/usuarios';
import vendaRoutes from './routes/venda'; // Importando a rota de vendas
import homeRoutes from './routes/home'; // Importando a rota de home
import { verificarToken } from './middlewares/auth.middleware';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', authRoutes);
app.use('/produtos', produtosRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/vendas', vendaRoutes); // Importando a rota de vendas
app.use('/home', homeRoutes); // Importando a rota de home)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});