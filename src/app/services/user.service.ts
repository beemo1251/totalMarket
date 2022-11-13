import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users: any;
  public userAdm: any;
  private url = 'http://107.161.72.16:9951//api/Customer';
  private urlUser = 'http://107.161.72.16:9951//api/user';

  constructor(private http: HttpClient) { }

  buscarUsuario(loginData: UsuarioModel): string {

    let estado = '';
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].telefono == loginData.telefono)
      {
        if (this.users[i].password == loginData.password)
        {
          estado = this.users[i].ruc;
        }
      }
    }

    return estado;

  }

  insertarUsuario(customer: UsuarioModel, company: string) {

    let user: UsuarioModel = {
      ruc: customer.ruc,
      email: customer.email,
      telefono: customer.telefono,
      direccion: customer.direccion,
      password: customer.password,
      varCodCliente: ''
    }

    return this.http.post(this.url, user, {params: {company: company}});
  }

  listarUsuario(company: string) {
    this.http.get(this.url, {params: {company: company}}).subscribe(
      resp => {
        this.users = resp;
      }
    )
  }

  listarUser(company: string) {
    this.http.get(this.urlUser, {params: {company: company}}).subscribe(
      res => {
        this.userAdm = res;
      }
    )
  }

  buscarUser(user: any) {
    var result = {estado: false, resp: 'error'};
    for (let i = 0; i < this.userAdm.length; i++) {
      if (this.userAdm[i].usuario.toLocaleLowerCase() == user.telefono.toLocaleLowerCase()){
        if (this.userAdm[i].password == user.password){
          result.estado = true;
          result.resp = this.userAdm[i].usuario;
          break;
        }
        if (this.userAdm[i].password != user.password) {
          result.estado = false;
          result.resp = 'Contraseña incorrecta';
          break;
        }
      } else {
        result.estado = false;
        result.resp = 'Usuario no encontrado';
      }
    }
    return result;
  }
}
