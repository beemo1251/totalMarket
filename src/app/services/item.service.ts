import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CompanyService } from './company.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private url: string = 'http://107.161.72.16:9951//api/item';
  // private url: string = 'https://localhost:44322//api/item';
  public name = '';

  constructor(private http: HttpClient, private companyService: CompanyService) { }

  getItems(name: string){
    this.searchCompany();
    return this.http.get(this.url, {params: {company: name}});
  }

  searchCompany() {
    this.companyService.selecCompany();
    setTimeout(() => {
      this.name = this.companyService.nameApi;
    }, 500);
  }
}
