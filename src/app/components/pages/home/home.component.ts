import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceApiAmazonService } from 'src/app/service/service-api-amazon.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public productos : any;
  public productosOrdenadosByPrice: any;
  public productosOrdenadosByRating: any;

  constructor(
    private amazonApiService : ServiceApiAmazonService,
  ) { }

  ngOnInit(): void {
    this.searchProducts();
  }

  async searchProducts(){
    this.amazonApiService.getProducts().then( resp => {
      this.productos = resp['data']
      localStorage.setItem('productos', JSON.stringify(this.productos))
      this.ordenarProductosByPrice();
      this.ordenarProductosByRating();
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    });

  }

  ordenarProductosByPrice() {
    this.productosOrdenadosByPrice = _.orderBy(this.productos, ['price'] ,['asc'])
  }

  ordenarProductosByRating() {
    let productosOrdenadosByRating = _.orderBy(this.productos, ['rating.rate'] ,['desc'])
    console.log(productosOrdenadosByRating);
  }

  ilike( product: any ) {
    let producto = _.find(this.productos, ['id', product.id]);
    producto['like'] = !producto['like'];
    console.log(producto);
    console.log(localStorage.removeItem('productos'));
    localStorage.setItem('productos', JSON.stringify(this.productos))
  }

}
