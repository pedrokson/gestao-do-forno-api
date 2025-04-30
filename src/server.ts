import express from 'express';
import cors from 'cors';
import produtosRoutes from './routes/produtos';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/produtos', produtosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});