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
import { GoodInfoComponent } from './good-info/good-info.component';
import { RequestComponent } from './request/request.component';
import { AdminComponent } from './admin/admin.component';
import { ReqlistComponent } from './reqlist/reqlist.component';
import { ClientsComponent } from './clients/clients.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeedataComponent } from './employeedata/employeedata.component';
import { NewrequestComponent } from './newrequest/newrequest.component';

const routes: Routes = [
 { path: 'timing', component: TimingComponent},
 {path: 'home',component: CatalogComponent,
  children:[
    {
      path:'', component: GoodsCatalogComponent,

    },
    {
      path:'service', component: ServCatalogComponent
    },
    {
      path:':id', component:GoodInfoComponent
    }
  ]
  },
  {path:'login', component:LoginComponent},
  {path:'registration', component:RegisterComponent},
  {path:'cart', component:CartComponent},
  {path:'quickly', component:QuicklyRequestComponent},
  {path:'account', component:KabinetComponent},
  {path:'contacts', component:ContactsComponent},
  {path:'request', component:RequestComponent},
  {path: 'admin',component: AdminComponent,
  children:[
    {
      path : '', component : ReqlistComponent,
    },
    {
      path : 'clients', component : ClientsComponent,
    },
    {
      path : 'employees', component : EmployeeComponent
    },
    {
      path : 'dataadd' , component : EmployeedataComponent,

    },
    {
      path : 'data/:id' , component : EmployeedataComponent,
    },
    {
      path : 'newrequest' , component : NewrequestComponent,
    }

  ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
