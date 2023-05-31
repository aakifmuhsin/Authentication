import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddnewComponent } from './addnew/addnew.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { ListingComponent } from './listing/listing.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { RoleGuard } from './shared/role.guard';
import { RegisterComponent } from './register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';

const routes: Routes = [
  { path: "", component: HomeComponent, 
  canActivate: [AuthGuard] },
  { path: "home", component: HomeComponent, 
  canActivate: [AuthGuard] },
  {
    path: "customer", component: CustomerComponent,  canActivate: [AuthGuard],
    children: [{
      path: "", component: ListingComponent
    },
    { path: "create", component: AddnewComponent },
    { path: "Edit/:id", component: AddnewComponent }]
   // ,canActivate:[RoleGuard]
  },
  {path:"login",component:LoginComponent ,canActivate:[RoleGuard]},
  {path:"register", component: RegisterComponent,canActivate:[RoleGuard]},
  {path:"forgetpassword", component: ForgetpasswordComponent,canActivate:[RoleGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
