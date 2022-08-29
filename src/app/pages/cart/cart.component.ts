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

  constructor(private carritoService : CarritoService) { }

  ngOnInit(): void {
    this.item = this.carritoService.listarCarrito();
    console.log(this.item);
  }

}
