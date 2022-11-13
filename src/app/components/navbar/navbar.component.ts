import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: string | null = '';
  admin: string | null = '';

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.usuario = localStorage.getItem('cliente');
    this.admin = localStorage.getItem('admin');
  }

  login() {
    // this.auth.loginWithPopup();
    
  }

  logout() {
    // this.auth.logout();
  }

  downloadPDF() {
    
  }

}
