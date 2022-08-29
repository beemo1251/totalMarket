export interface ItemResponse {
    idItem: string;
    desc1Item: string;
    desc2Item: string;
    price: number;
    stock: number;
    estado: EstadoItem;
}

export interface EstadoItem {
    id: number;
    descEstado: string;
}