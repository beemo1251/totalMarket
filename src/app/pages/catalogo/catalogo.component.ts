import { Component, OnInit } from '@angular/core';
import { ItemResponse } from 'src/app/models/item.models';
import { CompanyService } from 'src/app/services/company.service';
import { ItemService } from 'src/app/services/item.service';
import { ProductosService } from 'src/app/services/productos.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  listItemByCategory: ItemResponse[] = [];
  listCategoria: String [] = [];
  listMarca: string[] = [];
  listTmp: ItemResponse[] = [];
  listPDF = [''];
  listItemsPDF: ItemResponse[] = [];
  obj = {
    buscar: '',
    cate: ['0'],
    marca: ['0'],
    min: '',
    max: ''
  }
  filtrar = '';
  precioLeft = '10';
  precioRight = '5000';
  page: number = 1;
  cantPage: number = 14;

  constructor(private productoService: ProductosService, private itemService: ItemService, private companyService: CompanyService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.itemService.getItems(this.companyService.nameApi).subscribe((resp: any) => {
        this.listCategoria = this.productoService.listarCategoria();
        this.listItemByCategory = this.productoService.listItemByCategory(this.listCategoria);
        this.listMarca = this.productoService.listarMarca();
        this.listTmp = this.listItemByCategory;
        this.calcularPaginasCanvas(this.listItemByCategory);
      })
    }, 500);
    
    const progress = document.querySelector(".slider .progress") as HTMLInputElement;
    progress.style.marginLeft = (Number(this.precioLeft) / 10000) * 100 + "%";
    progress.style.marginRight = (Number(this.precioRight) / 10000) * 100 + "%";
    this.actionsPrecios();
  }

  // downloadPDF() {
  //   Swal.showLoading();
  //   const DATA = document.getElementById('htmlData');
  //   const doc = new jsPDF('p', 'mm');

  //   const options = {
  //     background: 'white',
  //     scale: 3
  //   }
  //   html2canvas(DATA!, options).then((canvas) => {
  //     const img = canvas.toDataURL('image/PNG');

  //     const bufferX = 15;
  //     var bufferY = 15;
  //     const imgProps = (doc as any).getImageProperties(img);
  //     const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //     doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

  //     return doc;
  //   }).then((docResult) => {
  //     docResult.save(`Catalogo_${new Date().toISOString()}.pdf`);
  //     Swal.close();
  //   });
  // }

  async downloadPDF() {
    Swal.showLoading();
    // const DATA = document.getElementById('htmlData');
    let DATA = document.querySelectorAll("#print .list-products") as NodeListOf<HTMLElement>;
    const doc = new jsPDF('p', 'mm');

    const options = {
      background: 'white',
      scale: 3
    }

    const bufferX = 15;
    const bufferY = 15;

    for (let i = 0; i < this.listPDF.length; i++) {
      await html2canvas(DATA[i]!, options).then((canvas) => {
        const img = canvas.toDataURL('image/PNG');
  
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        if (i > 0) {
          doc.setPage(i+1);
        }
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
  
        return doc;
      }).then((docResult) => {
        if (i == this.listPDF.length) {
          docResult.save(`Catalogo_${new Date().toISOString()}.pdf`);
          Swal.close();
        } else {
          docResult.addPage();
        }
      });
    }
  }

  // async downloadPDF() {
  //   Swal.showLoading();
  //   var doc = new jsPDF();
  //   let DATA = document.querySelectorAll("#print .list-products") as NodeListOf<HTMLElement>;
  //   var pageHeight = doc.internal.pageSize.height;
  //   var pageHeightLeft = pageHeight;
  //   var position = 0;
  //   var estado = false;

  //   for (let i = 0; i < DATA.length; i++) {
  //     const options = {
  //       background: 'white',
  //       scale: 3
  //     }
      
  //     await html2canvas(DATA[i], options).then((canvas) => {
  //       var img = new Image();
  //       img.src = canvas.toDataURL('image/PNG');
  //       img.onload = () => {
  //         // var img = canvas.toDataURL('image/PNG');
  //         // const bufferX = 15;
  //         // const bufferY = 15;
  //         // var imgProps = (doc as any).getImageProperties(img);
  //         // var pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
  //         // var pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //         // if (i != 0) {
  //         //   doc.addPage();
  //         //   doc.setPage(i+1);
  //         // }
  //         if (pageHeightLeft - canvas.height <= 0) {
  //           doc.addPage();
  //         }
  //         doc.addImage(img, 'PNG', 0, position, canvas.width, canvas.height, undefined, 'FAST');
  //         pageHeightLeft -= canvas.height;
  //         position += canvas.height;

  //         if (i == DATA.length - 1) {
  //           estado = true;
  //         }
  //         console.log(estado);
  //       }
  //     });
  //   }
  //   if (estado) {
  //     doc.save(`Catalogo_${new Date().toISOString()}.pdf`);
  //     Swal.close();
  //   }
  // }

  filtrarProductos(cate: any, marca: any, raiz: number) {
    const progress = document.querySelector(".slider .progress") as HTMLInputElement;
    const rangeInput = document.querySelectorAll(".range-input input") as NodeListOf<HTMLInputElement|any>;
    const input = document.querySelectorAll('.input') as NodeListOf<HTMLInputElement|any>;
    if (raiz == 0 || raiz == 1) {
      if (raiz == 0) {
        rangeInput[0].value = input[0].value;
        progress.style.marginLeft = (input[0].value / rangeInput[0].max) * 100 + "%";
      }
      if (raiz == 1) {
        rangeInput[1].value = input[1].value;
        progress.style.marginRight = 100 - (input[1].value / rangeInput[1].max) * 100 + "%";
      }
    }

    this.obj.buscar = this.filtrar;
    this.obj.min = this.precioLeft;
    this.obj.max = this.precioRight;
    if (cate != '') {
      if (this.obj.cate.includes(cate)) {
        this.obj.cate = this.obj.cate.filter(ct => ct !== cate);
      } else {
        this.obj.cate.push(cate);
      }
    }
    if (marca != '') {
      if (this.obj.marca.includes(marca)) {
        this.obj.marca = this.obj.marca.filter(mr => mr !== marca);  
      } else {
        this.obj.marca.push(marca);
      }
    }

    this.listItemByCategory = this.listTmp;
    this.listItemByCategory = this.listItemByCategory.filter(a => a.searchDescription.includes(this.obj.buscar.toUpperCase()));
    this.listItemByCategory = this.listItemByCategory.filter(d => d.unitPrice >= Number(this.obj.min) && d.unitPrice <= Number(this.obj.max));
    if (this.obj.cate.length > 1) {
      this.listItemByCategory = this.listItemByCategory.filter(b => this.obj.cate.includes(b.itemCategory));
    }
    if (this.obj.marca.length > 1) {
      this.listItemByCategory = this.listItemByCategory.filter(c => this.obj.marca.includes(c.manufacturerCode));
    }
    this.calcularPaginasCanvas(this.listItemByCategory);
  }

  actionsPrecios() {
    const rangeInput = document.querySelectorAll(".range-input input") as NodeListOf<HTMLInputElement|any>;
    const priceInput = document.querySelectorAll(".price-input input") as NodeListOf<HTMLInputElement|any>;
    const progress = document.querySelector(".slider .progress") as HTMLInputElement;

    let priceGap =  1000;

    // priceInput.forEach(input => {
    //   input.addEventListener("input", (e: InputEvent) => {
    //     let minVal = parseInt(priceInput[0].value),
    //     maxVal = parseInt(priceInput[1].value);
    //     let t = e.target as HTMLInputElement;

    //     if ((maxVal - minVal >= priceGap) && maxVal <= 10000) {
    //       if (t?.className === "input-min") {
    //         rangeInput[0].value = minVal;
    //         progress.style.marginLeft = (minVal / rangeInput[0].max) * 100 + "%";
    //       } else {
    //         rangeInput[1].value = maxVal;
    //         progress.style.marginRight = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    //       }
    //     }
    //   })
    // })

    rangeInput.forEach(input => {
      input.addEventListener("input", (e: InputEvent) => {
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);
        let t = e.target as HTMLInputElement;

        if (maxVal - minVal < priceGap) {
          if (t?.className === "range-min") {
            rangeInput[0].value = maxVal - priceGap;
          } else {
            rangeInput[1].value = minVal + priceGap;
          }
        } else {
          priceInput[0].value = minVal;
          priceInput[1].value = maxVal;
          progress.style.marginLeft = (minVal / rangeInput[0].max) * 100 + "%";
          progress.style.marginRight = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }

      })
    })
  }

  calcularPaginasCanvas(list: ItemResponse[]) {
    var num = 1;
    if (list.length > this.cantPage) {
      num = list.length/this.cantPage;
    }

    this.listPDF = [];
    for (let i = 0; i < Number(num.toFixed()); i++) {
      this.listPDF.push(i.toString());
    }
  }

  itemsPagePDF(pagina: string) {
    var pag = Number(pagina);
    var min = (this.cantPage * pag);
    var max = (pag + 1) * this.cantPage;
    return this.listItemByCategory.slice(min, max);
  }

}
