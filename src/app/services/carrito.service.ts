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
    this.item.push(producto);
  }

  listarCarrito() : ItemResponse[] {
    return this.item;
  }
}
