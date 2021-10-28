import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceApiAmazonService } from 'src/app/service/service-api-amazon.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public producto_id: any = null
  public producto_nombre: string = ''
  public producto_precio: number = 0
  public producto_descripcion: string = ''
  public producto_rate: number = 0
  public producto_count: number = 0
  public producto_categoria: string = ''
  public producto_imagen: string = ''
  public cantidad : number = 0

  public productosRelacionados: any 

  constructor(
    private activatedRoute: ActivatedRoute,
    private amazonApiService : ServiceApiAmazonService,
  ) { 

    this.activatedRoute.params.subscribe( params => {
      this.producto_id = params.idproducto
    });
  }

  ngOnInit(): void {
    this.searchProductById()
  }

  searchProductById(){
    this.amazonApiService.getProductById(this.producto_id).then( (resp: any) => {

      let { title, description, rating, category, image, price } = resp['data']

      this.producto_nombre = title  
      this.producto_descripcion = description
      this.producto_precio = price
      this.producto_count = rating['count']
      this.producto_rate = rating['rate']
      this.producto_categoria = category
      this.producto_imagen = image

      this.searchProductByCategory()
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  searchProductByCategory(){
    this.amazonApiService.getProductByCategory(this.producto_categoria).then( (resp: any) => {
      this.productosRelacionados = resp['data']   
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

}
