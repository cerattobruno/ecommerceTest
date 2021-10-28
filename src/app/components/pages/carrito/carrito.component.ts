import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  public carrito: any = []
  public totalCarrito: any = 0

  constructor() {
    this.actualizarCarrito()
   }

  ngOnInit(): void {
    
  }

  actualizarCarrito(){
    this.carrito = []
    this.totalCarrito = 0
    let c: any = localStorage.getItem('carrito')
    if( c != '' && c != null ){
      this.carrito = JSON.parse(c)
    }

    this.carrito.forEach((elm: any) => {
      this.totalCarrito += (elm.precio * elm.cantidad)
    });
  }

  deleteProduct( index: any ){
    console.log(this.carrito.length);
    this.carrito.splice(index,1)
    console.log(this.carrito.length);
    localStorage.removeItem('carrito')
    localStorage.setItem('carrito', JSON.stringify(this.carrito))
    this.actualizarCarrito()
  }

}
