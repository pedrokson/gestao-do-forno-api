export interface Venda {
  id?: number;
  produtoId: number;
  quantidade: number;
  valorTotal: number;
  dataVenda: string;
  clienteId: number;
  forma_pagamento: string;
}
