import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      ruc: new FormControl('', Validators.compose([Validators.required, Validators.pattern("[0-9]{8,11}")])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[^@]+@[^@]+\.[a-zA-Z]{2,}$")])),
      telefono: new FormControl('', Validators.compose([Validators.required, Validators.pattern("[0-9]{7,9}")])),
      direccion: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{8,16}$")])),
      varCodCliente: []
    });
  }

  signUp() {
    if (this.formGroup.status == 'VALID') {
      const user = this.formGroup.value;
      this.userService.insertarUsuario(user, this.companyService.company).subscribe(
        (resp: any) => {
          if (resp.length == 8) {
            Swal.fire({
              icon: 'success',
              text: 'Se registro correctamente'
            });
            this.formGroup.reset();
            var fm = document.getElementById('formRegister');
            fm!.className = '';
          } else {
            Swal.fire({
              icon: 'error',
              text: 'Ocurrio un problema en el registro'
            })
          }
        }
      );
    } else {
      var fm = document.getElementById('formRegister');
      fm!.className = 'was-validated';
    }
  }

}
