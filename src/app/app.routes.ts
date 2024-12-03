import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import {EditproductsComponent} from "./pages/editproducts/editproducts.component";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch: 'full'
    },
    {
        path:'products',
        component:ProductListComponent
    },
    {
      path:'editproducts',
      component:EditproductsComponent
    },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'**',
    component:LoginComponent
  },
];
