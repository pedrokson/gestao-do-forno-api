import sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, 'padaria.db');

const db: Database = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Erro ao conectar ao banco:', err.message);
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL,
      estoque INTEGER NOT NULL,
      custo_atual REAL DEFAULT 0,
      custo_medio REAL DEFAULT 0,
      margem REAL DEFAULT 0,
      preco_venda REAL DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      produto_id INTEGER NOT NULL,
      quantidade INTEGER NOT NULL,
      valor_total REAL NOT NULL,
      data_venda TEXT NOT NULL,
      cliente_id INTEGER NOT NULL,
      FOREIGN KEY (produto_id) REFERENCES produtos (id)
    )
  `);
});

export default db;