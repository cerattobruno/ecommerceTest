import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  public carrito: any = []
  public totalCarrito: any = 0
  public isLoaded: boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.actualizarCarrito()
   }

  ngOnInit(): void {
    
  }

  actualizarCarrito(){
    this.spinner.show()
    this.carrito = []
    this.totalCarrito = 0
    let c: any = localStorage.getItem('carrito')
    
    setTimeout(() => {
      if( c != '' && c != null ){
        this.carrito = JSON.parse(c)
      }
  
      this.carrito.forEach((elm: any) => {
        this.totalCarrito += (elm.precio * elm.cantidad)
      });
      this.isLoaded = true;
      this.spinner.hide()
    }, 1000)
  }

  deleteProduct( index: any ){
    console.log(this.carrito.length);
    this.carrito.splice(index,1)
    console.log(this.carrito.length);
    localStorage.removeItem('carrito')
    localStorage.setItem('carrito', JSON.stringify(this.carrito))
    this.toastr.success('', 'Producto eliminado correctamente', {
      progressBar: true,
      progressAnimation: 'increasing'
    });
    this.actualizarCarrito()
  }

}
