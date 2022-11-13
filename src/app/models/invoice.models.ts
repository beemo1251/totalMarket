export interface headerModel {
    postingDate: string,
    docDate: string,
    dueDate: string,
    Ruc: string,
    CurrencyCode: string,
    PaymentMethod: string,
    PaymentTerms: string,
    GenBusPostingGroup: string,
    CodeVendedor: string,
    tipoVenta: string
}

export interface LineModel {
    DocNo: string,
    LineNo: string,
    No: string,
    Descripcion: string,
    Unidad: string,
    Cantidad: string,
    Precio: string,
    tipoVenta: string
}