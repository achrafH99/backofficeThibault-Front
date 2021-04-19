import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path : 'home' ,component :HomeComponent},
  {path : 'detailProduct' ,component : ProductDetailPageComponent},
  {path: 'product/:id' , component : ProductDetailComponent},
  {path : 'products' ,component :ProductsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
