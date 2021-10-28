import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeBusquedaProductos'
})
export class PipeBusquedaProductosPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultFilter : any = [];
    console.log('arg: ', arg);
    console.log('value: ', value);
    if (arg === '' || arg.length < 3) return resultFilter;
    value.forEach((p: any) => {
      if ( p.title.toLowerCase().indexOf( arg.toLowerCase() ) > -1 ) {
        resultFilter.push(p)
      }
      // familia['productos'].forEach(producto => {
      //   if ( producto.name.toLowerCase().indexOf( arg.toLowerCase() ) > -1 ) {
      //     if(resultFilter.length > 0){
      //       resultFilter.forEach( rf => {
      //         if (rf.id != familia.id){
      //           familia['nombreProducto'] = producto.name;
      //           resultFilter.push( familia );
      //         }
      //       })
      //     } else { 
      //       familia['nombreProducto'] = producto.name;
      //       resultFilter.push( familia ); 
      //     }
      //   }
      // });
    });
    return resultFilter;    
  }

}
