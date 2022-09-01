import { Injectable } from '@angular/core';
import { items } from '../data/item.data';
import { ItemResponse } from '../models/item.models';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  products = items;

  constructor() { }

  buscarProducto(text: string): ItemResponse[] {
    var result = this.products.filter(a => a.desc1Item.includes(text.toUpperCase()));
    return result;
  }
}
