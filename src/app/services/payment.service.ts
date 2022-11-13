import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  urlPayment = 'http://107.161.72.16:9951//api/payment';

  constructor(private http: HttpClient) { }

  listPayment(company: string) {
    return this.http.get(this.urlPayment, {params: {company: company}});
  }
}
