export interface Produto {
    id?: number;
    nome: string;
    preco: number;
    estoque: number;
    custo_atual?: number;
    custo_medio?: number;
    margem?: number;
    preco_venda?: number;
}