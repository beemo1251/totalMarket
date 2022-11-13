import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CompanyService } from 'src/app/services/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.buildForm();
    this.userService.listarUsuario(this.companyService.company);
    this.userService.listarUser(this.companyService.company);
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      telefono: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  signIn() {
    if (this.formGroup.status == 'VALID') {
      var resp = this.userService.buscarUser(this.formGroup.value);

      if (resp.estado == false && resp.resp == 'Usuario no encontrado') {
        const user = this.formGroup.value;
        let result = this.userService.buscarUsuario(user);
        if (result !== '') {
          localStorage.setItem('cliente', result);
          // this.router.navigateByUrl('/products');
        } else {
          Swal.fire({
            icon: 'warning',
            text: 'Cliente no registrado'
          })
        }
      } else {
        if (resp.estado){
          localStorage.removeItem('admin');
          localStorage.setItem('admin', resp.resp);
          // this.router.navigateByUrl('/products');
        } else {
          Swal.fire({
            icon: 'error',
            text: resp.resp
          });
        }
      }
    } else {
      var form = document.getElementById('formLogin');
      form!.className = 'was-validated';
    }
  }

}
