import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ServiceApiAmazonService } from 'src/app/service/service-api-amazon.service';
import { ServiceCarritoService } from 'src/app/service/service-carrito.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  public productos : any
  public categorias : any
  public filtroBusqueda : any
  public filtroCategorias: any

  constructor(
    private amazonApiService : ServiceApiAmazonService,
    private carritoService: ServiceCarritoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { 
    this.filtroBusqueda = ''

    let p: any = localStorage.getItem('productos')
    this.productos = JSON.parse(p)
  }

  ngOnInit(): void {
    this.searchCategories();
  }

  searchCategories(){
    this.spinner.show()
    this.amazonApiService.getCategories().then( resp => {
      this.categorias = resp['data'];
      this.spinner.hide()
    },
    (err: HttpErrorResponse) => {
      this.spinner.hide()

      this.toastr.error('Intente de nuevo', 'Ups! Algo salió mal', {
        progressBar: true,
        progressAnimation: 'increasing'
      });
    });
  }

  changeCategory( category: any){
    console.log(category);
  }

  searchProductByCategory(){
    this.amazonApiService.getProductByCategory(this.filtroCategorias).then( (resp: any) => {
      this.productos = resp['data']  
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  async agregarProductoAlCarrito( p: any ){
    let producto = {
      id: p.id,
      nombre: p.title,
      precio: p.price,
      cantidad: 1
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

}
