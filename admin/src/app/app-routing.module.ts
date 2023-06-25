import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/components/cart/cart.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';

const routes: Routes = [
  {path:'products', component:AllProductsComponent},
  {path:'', component:CartComponent},
  {path:'cart', component:CartComponent},
  {path:'details/:id', component:ProductsDetailsComponent},
  {path:'**', redirectTo:'cart', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
