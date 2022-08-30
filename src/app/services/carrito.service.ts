import { Injectable } from '@angular/core';
import { ItemResponse } from '../models/item.models';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  item : ItemResponse[] = [];
  itemTemp : ItemResponse[] = [];

  constructor() { }

  agregarCarrito(producto: ItemResponse, cantidad: number) {

    var repetido = this.buscarItemRepetido(producto, this.itemTemp);

    if (repetido) {

      this.obtenerItemRepetido(producto, cantidad);

    } else {
      var objTemp =
      {
        idItem: producto.idItem,
        desc1Item: producto.desc1Item,
        desc2Item: producto.desc2Item,
        price: producto.price,
        stock: cantidad,
        estado: producto.estado
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
      if (lista[i].idItem == producto.idItem)
      {
        response = true;
      }
    }
    return response;
  }

  obtenerItemRepetido(producto : ItemResponse, cantidad : number) {

    for (let i = 0; i < this.itemTemp.length; i++) {
      if (this.itemTemp[i].idItem == producto.idItem)
      {
        this.itemTemp[i].stock = this.itemTemp[i].stock + cantidad;
      }
    }
  }

  quitarProducto(producto : ItemResponse) {
    for (let i = 0; i < this.itemTemp.length; i++) {
      if (this.itemTemp[i].idItem == producto.idItem)
      {
        this.itemTemp.splice(i, 1);
      }
    }
  }

  calcularQuantityTotal(array : ItemResponse[]) : number {
    var TotalQuantity = 0;
    for(let i = 0; i < array.length; i++){
      TotalQuantity += array[i].stock;
      // this.TotalAmount += (this.item[i].price * this.item[i].stock);
    }
    return TotalQuantity;
  }

  calcularAmountTotal(array : ItemResponse[]) : number {
    var TotalAmount = 0;
    for(let i = 0; i < array.length; i++){
      // TotalQuantity += this.item[i].stock;
      TotalAmount += (array[i].price * array[i].stock);
    }
    return TotalAmount;
  }
}
