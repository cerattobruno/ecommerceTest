import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { StoreComponent } from './components/pages/store/store.component';

const routes: Routes = [
  { path: 'tienda', component: StoreComponent },
  { path: 'home', component: HomeComponent,  pathMatch: 'full' },
  { path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
