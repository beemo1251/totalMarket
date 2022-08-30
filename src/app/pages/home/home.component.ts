import { Component, Input, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { ItemResponse } from '../../models/item.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() AmountTotal = 0;
  @Input() QuantityTotal = 0;
  items : ItemResponse[] = [];

  constructor(private carritoService : CarritoService) { }

  ngOnInit(): void {
    // this.items = this.carritoService.listarCarrito();
    //this.AmountTotal = this.carritoService.calcularAmountTotal(this.items);
    //this.QuantityTotal = this.carritoService.calcularQuantityTotal(this.items);
  }

}
