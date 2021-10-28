import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { StoreComponent } from './components/pages/store/store.component';
import { ProductComponent } from './components/pages/product/product.component';
import { CarritoComponent } from './components/pages/carrito/carrito.component';

const routes: Routes = [
  { path: 'carrito', component: CarritoComponent },
  { path: 'tienda/:idproducto', component: ProductComponent },
  { path: 'tienda', component: StoreComponent },
  { path: 'home', component: HomeComponent,  pathMatch: 'full' },
  { path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
