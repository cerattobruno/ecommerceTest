import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ServiceApiAmazonService } from 'src/app/service/service-api-amazon.service';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { hide } from '@popperjs/core';

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
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    if( localStorage.getItem('productos') != '' ){
      let p: any = localStorage.getItem('productos')
      this.productos = JSON.parse(p)
      this.ordenarProductosByRating()
    } else this.searchProducts()

    // this.searchProducts()
  }

  async searchProducts(){
    this.spinner.show()
    this.amazonApiService.getProducts().then( resp => {
      this.productos = resp['data']
      localStorage.setItem('productos', JSON.stringify(this.productos))
      this.ordenarProductosByPrice();
      this.ordenarProductosByRating();
      this.spinner.hide()
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    });

  }

  ordenarProductosByPrice() {
    this.productosOrdenadosByPrice = _.orderBy(this.productos, ['price'] ,['asc'])
  }

  ordenarProductosByRating() {
    this.productosOrdenadosByRating = _.orderBy(this.productos, ['rating.rate'] ,['desc'])

  }

  ilike( product: any ) {
    let producto = _.find(this.productos, ['id', product.id])
    producto['like'] = !producto['like']

    localStorage.removeItem('productos')
    localStorage.setItem('productos', JSON.stringify(this.productos))
  }

}
