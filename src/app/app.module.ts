import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { registerLocaleData } from '@angular/common';
import localeEsPe from '@angular/common/locales/es-PE';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthModule } from '@auth0/auth0-angular';
import { FooterComponent } from './components/footer/footer.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { NgxPaginationModule } from 'ngx-pagination';

registerLocaleData(localeEsPe, 'es')

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    CatalogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,

    AuthModule.forRoot({
      domain: 'dev-jyq60hvnflu7g5a6.us.auth0.com',
      clientId: 'Z7F4zb2azDpxsVukC08Fq9m1gjsmOTfZ'
    })
  ],
  providers: [{provide: LOCALE_ID, useValue: "es-PE"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
