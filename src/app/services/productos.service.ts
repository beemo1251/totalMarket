import { Injectable } from '@angular/core';
import { ItemResponse } from '../models/item.models';
import { CompanyService } from './company.service';
import { ItemService } from './item.service';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  products: ItemResponse[] = [];
  categoria: string[] = [];
  marca: string[] = [];

  constructor(private itemService: ItemService, private companyService: CompanyService) {
    this.companyService.selecCompany();
    setTimeout(() => {
      this.itemService.getItems(companyService.nameApi).subscribe((resp: any) => {
        this.products = resp;
      });
    }, 500);
  }

  listarProductos() {
    this.companyService.selecCompany();
    setTimeout(() => {
      this.itemService.getItems(this.companyService.nameApi).subscribe((resp: any) => {
        this.products = resp;
      });
    }, 500);
  }

  buscarProducto(text: string): ItemResponse[] {
    var result = this.products.filter((a:any) => a.searchDescription.includes(text.toUpperCase()));
    return result;
  }

  listarCategoria(): string[]
  {

    for (let i = 0; i < this.products.length; i++) {
      this.categoria.push(this.products[i].itemCategory);
    }

    const dataArr = new Set(this.categoria);
    let result = [...dataArr];

    return result;
  }

  listarMarca() {
    for (let i = 0; i < this.products.length; i++) {
      this.marca.push(this.products[i].manufacturerCode);
    }

    const dataArr = new Set(this.marca);
    let result = [...dataArr];

    return result;
  }

  listItemByCategory(category: String[]): any{
    var arrayReturn : any[] = [];

    for(let i = 0; i < category.length; i++){
      for(let x = 0; x < this.products.length; x++){
        if(category[i] == this.products[x].itemCategory){
          arrayReturn.push(this.products[x]);
        }
      }
    }
    return arrayReturn;
    
  }

}
