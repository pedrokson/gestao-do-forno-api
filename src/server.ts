import express from 'express';
import cors from 'cors';
import produtosRoutes from './routes/produtos';
import usuariosRoutes from './routes/usuarios';
import { verificarToken } from './middlewares/auth.middleware';
const app = express();

app.use(cors());
app.use(express.json());
app.use('/produtos', verificarToken, produtosRoutes);
app.use('/usuarios', verificarToken, usuariosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});