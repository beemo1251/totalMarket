import { Component, OnInit } from '@angular/core';
import { headerModel } from 'src/app/models/invoice.models';
import { CompanyService } from 'src/app/services/company.service';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';
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
  payment = '';
  ruc = '';
  cliente: string | null = '';

  constructor(private carritoService : CarritoService, private paymentService: PaymentService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.item = this.carritoService.listarCarrito();
    this.TotalAmount = this.carritoService.calcularAmountTotal(this.item);
    this.TotalQuantity = this.carritoService.calcularQuantityTotal(this.item);
    this.companyService.selecCompany();
    setTimeout(() => {
      this.paymentService.listPayment(this.companyService.nameApi).subscribe(
        (resp: any) => {
          this.payment = resp[0].codigo;
        }
      )
    }, 500);
    this.cliente = localStorage.getItem('cliente');
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

  comprar() {
    if (this.cliente != null || this.cliente == '') {
      var header: headerModel = {
        postingDate: this.generateDate(0),
        docDate: this.generateDate(0),
        dueDate: this.generateDate(3),
        Ruc: this.cliente!,
        CurrencyCode: '',
        PaymentMethod: this.payment,
        PaymentTerms: 'CON',
        GenBusPostingGroup: 'NACIONAL',
        CodeVendedor: '',
        tipoVenta: 'Pedido'
      }
  
      // console.log(header);
      this.carritoService.generarPedido(header, this.item);
      this.item = [];
      this.TotalAmount = 0;
      this.TotalQuantity = 0;
    } else {
      Swal.fire({
        icon: 'warning',
        text: 'Debe iniciar sesión para realizar la compra'
      })
    }
  }

  generateDate(dias?: number): string {
    let date: Date = new Date();
    var reslt: string

    if (dias != 0) {
      date.setDate(date.getDate()+dias!);
    }

    if (date.getDate().toString().length > 1) {
      reslt = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
    } else {
      reslt = date.getFullYear() + '-' + (date.getMonth()+1) + '-0' + date.getDate();
    }

    return reslt;
  }
}
