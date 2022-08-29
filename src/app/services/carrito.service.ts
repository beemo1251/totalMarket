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
    console.log(repetido);

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
    console.log(lista.length);
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
}
