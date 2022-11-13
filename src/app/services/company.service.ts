import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyModal, companyModel } from '../models/company.models';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private url: string = 'http://107.161.72.16:9951//api/company';
  // private url: string = 'https://localhost:44322//api/company';
  // private urlPer: string = 'https://localhost:44322//api/personalizacion';
  private urlPer: string = 'http://107.161.72.16:9951//api/personalizacion';
  public company = 'GLOBALDIGITAL';
  public nameApi = '';
  public nameServ = '';

  constructor(private http: HttpClient) { }

  selecCompany() {
    this.http.get<CompanyModal[]>(this.url).subscribe(
      (resp: CompanyModal[]) => {
        for (let i = 0; i < resp.length; i++) {
          if (resp[i].pkCompany == this.company)
          {
            this.nameApi = resp[i].apiDynamics;
            this.nameServ = resp[i].servDynamics;
          }
          
        }
      }
    )
  }

  personalizacion(user: string) {
    this.http.get(this.urlPer).subscribe(
      (resp: any) => {
        for (let i = 0; i < resp.length; i++) {
          if (resp[i].usuario == user.toUpperCase()) {
            this.company = resp[i].company;
          }
        }
      }
    )
  }

  companyInfo(company: string) {
    return this.http.get<companyModel>(this.url, {params: { company: company }});
  }
}
