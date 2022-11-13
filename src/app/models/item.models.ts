export interface ItemResponse {
    No_: string;
    SKU: string;
    searchDescription: string;
    itemCategory: string;
    manufacturerCode: string;
    unitPrice: number;
    inventory: number;
}

export interface EstadoItem {
    id: number;
    descEstado: string;
}