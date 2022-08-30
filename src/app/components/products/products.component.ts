import { Component, Input, OnInit } from '@angular/core';
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
  items : ItemResponse[] = [];
  @Input() AmountTotal = 0;
  @Input() QuantityTotal = 0;

  constructor(private carritoService : CarritoService) { 
    // this.item = items;
  }

  ngOnInit(): void {
    this.item = items;
    this.items = this.carritoService.listarCarrito();
    this.AmountTotal = this.carritoService.calcularAmountTotal(this.items);
    this.QuantityTotal = this.carritoService.calcularQuantityTotal(this.items);
  }

  enviarProducto( producto : ItemResponse, cantidad : number ) {
    this.carritoService.agregarCarrito(producto, cantidad);
    this.AmountTotal = this.carritoService.calcularAmountTotal(this.items);
    this.QuantityTotal = this.carritoService.calcularQuantityTotal(this.items);
  }

}
