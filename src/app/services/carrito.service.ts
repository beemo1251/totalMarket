import { Injectable } from '@angular/core';
import { headerModel, LineModel } from '../models/invoice.models';
import { ItemResponse } from '../models/item.models';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from './company.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  item : ItemResponse[] = [];
  itemTemp : ItemResponse[] = [];
  urlHeader = 'http://107.161.72.16:9951//api/inv';
  urlLine = 'http://107.161.72.16:9951//api/line';
  companyServ = 'GLOBALDIGITAL';

  constructor(private http: HttpClient, private companyService: CompanyService) { }

  agregarCarrito(producto: ItemResponse, cantidad: number) {

    var repetido = this.buscarItemRepetido(producto, this.itemTemp);

    if (repetido) {

      this.obtenerItemRepetido(producto, cantidad);

    } else {
      var objTemp =
      {
        No_: producto.No_,
        SKU: producto.SKU,
        searchDescription: producto.searchDescription,
        itemCategory: producto.itemCategory,
        manufacturerCode: producto.manufacturerCode,
        unitPrice: producto.unitPrice,
        inventory: cantidad
      }
      this.itemTemp.push(objTemp);
    }
  }

  listarCarrito() : ItemResponse[] {
    return this.itemTemp;
  }

  buscarItemRepetido(producto : ItemResponse, lista : ItemResponse[]) : boolean {
    var response = false;
    for(var i = 0; i < lista.length; i++){
      if (lista[i].No_ == producto.No_)
      {
        response = true;
      }
    }
    return response;
  }

  obtenerItemRepetido(producto : ItemResponse, cantidad : number) {

    for (let i = 0; i < this.itemTemp.length; i++) {
      if (this.itemTemp[i].No_ == producto.No_)
      {
        this.itemTemp[i].inventory = this.itemTemp[i].inventory + cantidad;
      }
    }
  }

  quitarProducto(producto : ItemResponse) {
    for (let i = 0; i < this.itemTemp.length; i++) {
      if (this.itemTemp[i].No_ == producto.No_)
      {
        this.itemTemp.splice(i, 1);
      }
    }
  }

  calcularQuantityTotal(array : ItemResponse[]) : number {
    var TotalQuantity = 0;
    for(let i = 0; i < array.length; i++){
      TotalQuantity += array[i].inventory;
      // this.TotalAmount += (this.item[i].price * this.item[i].stock);
    }
    return TotalQuantity;
  }

  calcularAmountTotal(array : ItemResponse[]) : number {
    var TotalAmount = 0;
    for(let i = 0; i < array.length; i++){
      // TotalQuantity += this.item[i].stock;
      TotalAmount += (array[i].unitPrice * array[i].inventory);
    }
    return TotalAmount;
  }

  generarPedido(headerModel: headerModel, items: ItemResponse[]) {
    var lines: LineModel[] = [];
    Swal.showLoading();
    this.http.post(this.urlHeader, headerModel, {params: {company: this.companyServ}}).subscribe(
      resp => {
        lines = this.generarLines(items, resp.toString());
        var i = 0;
        var x = (lines.length)*1000;
        var id = setInterval(() => {
          this.http.post(this.urlLine, lines[i], {params: {company: this.companyServ}}).subscribe(
            resp => {
              console.log(resp);
            }
          )
          i++;
        }, 1000);
        setTimeout(() => {
          clearInterval(id);
          Swal.fire({
            icon: 'success',
            text: 'Venta registrada correctamente'
          })
        }, x);
      }
    )
  }

  generarLines(items: ItemResponse[], noFactura: string) {
    let lineNo = 0;
    var arrLines: LineModel[] = [];
    let lines: LineModel;

    for (let i = 0; i < items.length; i++) {
      lineNo+=10000;
      lines = {
        DocNo: noFactura,
        LineNo: lineNo.toString(),
        No: items[i].No_,
        Descripcion: '',
        Unidad: '',
        Cantidad: (items[i].inventory).toString(),
        Precio: '0.0',
        tipoVenta: 'Pedido'
      }
      arrLines.push(lines);
    }

    return arrLines;
  }

}
