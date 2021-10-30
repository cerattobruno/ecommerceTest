import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ServiceApiAmazonService } from 'src/app/service/service-api-amazon.service';
import { ServiceCarritoService } from 'src/app/service/service-carrito.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import * as _ from 'lodash';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  public productos : any
  public categorias : any
  public filtroBusqueda : any
  public filtroCategorias: string[]
  public productosFiltrados: any

  constructor(
    private amazonApiService : ServiceApiAmazonService,
    private carritoService: ServiceCarritoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { 
    this.filtroBusqueda = ''
    this.filtroCategorias = []
    this.productosFiltrados = []

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

  cambioValor( event: any, categoria: any) {
    event ? (
      this.filtroCategorias.push(categoria)
    ) : (
      _.remove(this.filtroCategorias, (cat) =>  cat == categoria)
    )

    this.searchProductByCategory()
  }

  searchProductByCategory(){
      const resultFilter : any = []
      if (this.filtroCategorias.length < 0) return this.productos;
      this.productos.forEach((p: any) => {
        this.filtroCategorias.forEach(cat => {
          if( p.category == cat){
            resultFilter.push(p)
          }
        });
      });

      this.productosFiltrados = []
      this.productosFiltrados = resultFilter
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
