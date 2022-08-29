import { Component, OnInit } from '@angular/core';
import { ItemResponse } from '../../models/item.models';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  item : ItemResponse[] = [];
  TotalAmount = 0;
  TotalQuantity = 0;

  constructor(private carritoService : CarritoService) { }

  ngOnInit(): void {
    this.item = this.carritoService.listarCarrito();
    this.calcularTotal();
  }

  sumarCantidad(producto : ItemResponse, cantidad : number) {
    this.carritoService.obtenerItemRepetido(producto, cantidad);
  }

  restarCantidad(producto : ItemResponse, cantidad : number) {
    this.carritoService.obtenerItemRepetido(producto, cantidad);
  }

  quitarProducto() {

  }

  calcularTotal() {
    for(let i = 0; i < this.item.length; i++){
      this.TotalAmount += this.item[i].price * this.item[i].stock;
      this.TotalQuantity += this.item[i].stock;
    }
  }

}
