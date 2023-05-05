import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TimingComponent } from './timing/timing.component';
import { GoodsCatalogComponent } from './goods-catalog/goods-catalog.component';
import { ServCatalogComponent } from './serv-catalog/serv-catalog.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { QuicklyRequestComponent } from './quickly-request/quickly-request.component';
import { KabinetComponent } from './kabinet/kabinet.component';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    NavBarComponent,
    TimingComponent,
    GoodsCatalogComponent,
    ServCatalogComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    QuicklyRequestComponent,
    KabinetComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
