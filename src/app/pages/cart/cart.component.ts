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
    this.TotalAmount = this.carritoService.calcularAmountTotal(this.item);
    this.TotalQuantity = this.carritoService.calcularQuantityTotal(this.item);
    // this.calcularTotal();
  }

  sumarCantidad(producto : ItemResponse, cantidad : number) {
    this.carritoService.obtenerItemRepetido(producto, cantidad);
    this.TotalAmount = this.carritoService.calcularAmountTotal(this.item);
    this.TotalQuantity = this.carritoService.calcularQuantityTotal(this.item);
  }

  restarCantidad(producto : ItemResponse, cantidad : number) {
    this.carritoService.obtenerItemRepetido(producto, cantidad);
    this.TotalAmount = this.carritoService.calcularAmountTotal(this.item);
    this.TotalQuantity = this.carritoService.calcularQuantityTotal(this.item);
  }

  quitarProducto(producto : ItemResponse) {
    this.carritoService.quitarProducto(producto);
    this.carritoService.listarCarrito();
    this.TotalAmount = this.carritoService.calcularAmountTotal(this.item);
    this.TotalQuantity = this.carritoService.calcularQuantityTotal(this.item);
  }
}
