import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceCarritoService {

  constructor() { }

  agregarProducto( product: any ){
    let carrito: any = localStorage.getItem('carrito')
    let carritoObjeto: any = []

    if( carrito != '' && carrito != null ){
      carritoObjeto = JSON.parse(carrito)      
      carritoObjeto.push( product )
      
      localStorage.removeItem('carrito')
      localStorage.setItem('carrito', JSON.stringify(carritoObjeto))
    } else {
      carritoObjeto.push( product )
      localStorage.setItem('carrito', JSON.stringify(carritoObjeto))
    }

    return true
  }

  deleteProduct( carrito: any ){
    localStorage.removeItem('carrito')
    localStorage.setItem('carrito', JSON.stringify(carrito))
    
    return true
  }
}
