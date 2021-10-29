import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { ServiceApiAmazonService } from 'src/app/service/service-api-amazon.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2'
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
    private activatedRoute: ActivatedRoute,
    private amazonApiService : ServiceApiAmazonService,
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

  agregarProductoAlCarrito(){
    let carrito: any = localStorage.getItem('carrito')
    let carritoObjeto: any = []
    let producto = {
      id: this.producto_id,
      nombre: this.producto_nombre,
      precio: this.producto_precio,
      cantidad: this.cantidad
    }

    if( carrito != '' && carrito != null ){
      carritoObjeto = JSON.parse(carrito)      
      carritoObjeto.push( producto )
      
      localStorage.removeItem('carrito')
      localStorage.setItem('carrito', JSON.stringify(carritoObjeto))
    } else {
      carritoObjeto.push( producto )
      localStorage.setItem('carrito', JSON.stringify(carritoObjeto))
    }

    this.toastr.success('', 'Producto agregado correctamente', {
      progressBar: true,
      progressAnimation: 'increasing'
    });
  }

  validarCantidad(event: any){
    console.log(event.srcElement.value);
    if(event.srcElement.value <= 0){
      // event.srcEelement.value = 1
      this.cantidad = 1
    } else {
      this.cantidad = event.srcElement.value
    }
  }

}
