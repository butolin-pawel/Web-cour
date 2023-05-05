import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimingComponent } from './timing/timing.component';
import { CatalogComponent } from './catalog/catalog.component';
import { GoodsCatalogComponent } from './goods-catalog/goods-catalog.component';
import { ServCatalogComponent } from './serv-catalog/serv-catalog.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { QuicklyRequestComponent } from './quickly-request/quickly-request.component';
import { KabinetComponent } from './kabinet/kabinet.component';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
 { path: 'timing', component: TimingComponent},
 {path: 'home',component: CatalogComponent,
  children:[
    {
      path:'', component: GoodsCatalogComponent,

    },
    {
      path:'service', component: ServCatalogComponent
    }
  ]
  },
  {path:'login', component:LoginComponent},
  {path:'registration', component:RegisterComponent},
  {path:'cart', component:CartComponent},
  {path:'quickly', component:QuicklyRequestComponent},
  {path:'account', component:KabinetComponent},
  {path:'contacts', component:ContactsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
