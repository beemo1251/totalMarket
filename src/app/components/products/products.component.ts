import { Component, OnInit } from '@angular/core';
import { ItemResponse } from '../../models/item.models';
import { items } from '../../data/item.data';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  item : ItemResponse[] = [];

  constructor(private carritoService : CarritoService) { 
    // this.item = items;
  }

  ngOnInit(): void {
    this.item = items;
  }

  /*private agregarProducto( product : ItemResponse ) {
    localStorage.setItem('item', product);
  }*/

  enviarProducto( producto : ItemResponse ) {
    this.carritoService.agregarCarrito(producto, 1);
  }

}
