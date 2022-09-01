import { Component, Input, OnInit } from '@angular/core';
import { ItemResponse } from '../../models/item.models';
import { items } from '../../data/item.data';
import { CarritoService } from '../../services/carrito.service';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProductosService } from '../../services/productos.service';

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
  modalReferences: NgbModalRef | undefined;
  closeResult: string = '';
  mostrarLista = true;
  productosFilter: ItemResponse[] = [];
  buscar: string = '';

  constructor(private carritoService : CarritoService, private modalService: NgbModal, private productoService: ProductosService) { 
    // this.item = items;
  }

  ngOnInit(): void {
    this.item = items;
    this.items = this.carritoService.listarCarrito();
    this.AmountTotal = this.carritoService.calcularAmountTotal(this.items);
    this.QuantityTotal = this.carritoService.calcularQuantityTotal(this.items);
  }

  enviarProducto( producto : ItemResponse, cantidad : number ) {
    // setTimeout(() => {
    //   this.modalReferences?.dismiss();
    // }, -1000);
    this.carritoService.agregarCarrito(producto, cantidad);
    this.AmountTotal = this.carritoService.calcularAmountTotal(this.items);
    this.QuantityTotal = this.carritoService.calcularQuantityTotal(this.items);
  }

  openModal(content: any) {
    this.modalReferences = this.modalService.open(content);
    this.modalReferences.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  buscarProductoLista() {
    this.mostrarLista = false;
  }

  buscarProducto(texto: any) {
    this.productosFilter = this.productoService.buscarProducto(texto);
  }

  cerrarBuscador() {
    this.mostrarLista = true;
    this.buscar = '';
    this.productosFilter = [];
  }

}
