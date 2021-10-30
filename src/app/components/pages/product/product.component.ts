import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ServiceApiAmazonService } from 'src/app/service/service-api-amazon.service';
import { ServiceCarritoService } from 'src/app/service/service-carrito.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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
  public cantidad : number = 1

  public productosRelacionados: any 

  constructor(
    private amazonApiService : ServiceApiAmazonService,
    private carritoService: ServiceCarritoService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { 

    this.activatedRoute.params.subscribe( params => {
      this.producto_id = params.idproducto
    });
  }

  ngOnInit(): void {
    this.searchProductById()
  }

  searchProductById(){
    this.spinner.show()
    this.amazonApiService.getProductById(this.producto_id).then( (resp: any) => {

      let { title, description, rating, category, image, price } = resp['data']

      this.producto_nombre = title  
      this.producto_descripcion = description
      this.producto_precio = price
      this.producto_count = rating['count']
      this.producto_rate = rating['rate']
      this.producto_categoria = category
      this.producto_imagen = image
      
      this.spinner.hide()

      this.searchProductByCategory()
    },
    (err: HttpErrorResponse) => {
      this.toastr.error('Intente de nuevo', 'Ups! Algo salió mal', {
        progressBar: true,
        progressAnimation: 'increasing'
      });
    });
  }

  searchProductByCategory(){
    this.amazonApiService.getProductByCategory(this.producto_categoria).then( (resp: any) => {
      this.productosRelacionados = resp['data']  
    },
    (err: HttpErrorResponse) => {
      this.toastr.error('Intente de nuevo', 'Ups! Algo salió mal', {
        progressBar: true,
        progressAnimation: 'increasing'
      });
    });
  }

  async agregarProductoAlCarrito(){
    let producto = {
      id: this.producto_id,
      nombre: this.producto_nombre,
      precio: this.producto_precio,
      cantidad: this.cantidad
    }
    let respuestaCarrito = await this.carritoService.agregarProducto( producto )
    respuestaCarrito ? (
      this.toastr.success('', 'Producto agregado correctamente', {
        progressBar: true,
        progressAnimation: 'increasing'
      })
    ) : (
      this.toastr.warning('', 'No pudimos agregar el producto', {
        progressBar: true,
        progressAnimation: 'increasing'
      })
    )
    
  }

  validarCantidad(event: any){
    if(event.srcElement.value <= 0){
      this.cantidad = 1
    } else {
      this.cantidad = event.srcElement.value
    }
  }

}
