import { MoreProductsComponent } from './pages/more-products/more-products.component';
import { AuthComponent } from './layout/auth/auth.component';
import { BlankComponent } from './layout/blank/blank.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { HomeComponent } from './pages/home/home.component';
import { RedirectCommand, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { title } from 'process';
import { authGuard } from './core/guards/guard.auth/auth.guard';
import { homeguardGuard } from './core/guards/guard.auth/homeguard.guard';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
    {path :"" , redirectTo : "Home",pathMatch :"full"},
    {path:"" , component : BlankComponent,canActivate:[authGuard],title:"blank ", children : [
        {path :"Home" , loadComponent:()=> import("./pages/home/home.component").then((c)=>c.HomeComponent),title: "Home"},
        {path :"cart" , loadComponent:()=> import("./pages/cart/cart.component").then((c)=>c.CartComponent),title :"cart" },
        {path :"category" ,  loadComponent:()=> import("./pages/categories/categories.component").then((c)=>c.CategoriesComponent),title :"category" },
        {path :"products" ,  loadComponent:()=> import("./pages/products/products.component").then((c)=>c.ProductsComponent),title :"products" },
        {path :"more-products" ,  loadComponent:()=> import("./pages/more-products/more-products.component").then((c)=>c.MoreProductsComponent),title :"page2" },
        {path :"brand" , loadComponent:()=> import("./pages/brands/brands.component").then((c)=>c.BrandsComponent),title :"brand " },
        {path :"whishlist" , loadComponent:()=> import("./pages/allwhishlist/allwhishlist.component").then((c)=>c.AllwhishlistComponent),title :"whishlist " },
        {path :"checkout/:id" , loadComponent:()=> import("./pages/checkout/checkout.component").then((c)=>c.CheckoutComponent),title :"checkout " },
        {path :"allorders" , loadComponent:()=> import("./pages/allorders/allorders.component").then((c)=>c.AllordersComponent),title :"checkout " },
        {path :'details/:id' , loadComponent:()=> import("./pages/details/details.component").then((c)=>c.DetailsComponent),title :"Details " },
    ]},
     {path:"" , component : AuthComponent,canActivate:[homeguardGuard],title:"auth" , children :[
        {path :"login" ,  loadComponent:()=> import("./pages/login/login.component").then((c)=>c.LoginComponent),title : "login" },
        {path :"register" , loadComponent:()=> import("./pages/register/register.component").then((c)=>c.RegisterComponent),title :"register" },
        {path :"Forget" , loadComponent:()=> import("./pages/forgetpassword/forgetpassword.component").then((c)=>c.ForgetpasswordComponent),title :"forget" },
        { path: "**", component: LoginComponent }
    ]},
     
  
];
