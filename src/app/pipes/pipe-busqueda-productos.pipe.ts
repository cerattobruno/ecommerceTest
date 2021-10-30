import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeBusquedaProductos'
})
export class PipeBusquedaProductosPipe implements PipeTransform {

  transform(value: any, arg: string): any {
    const resultFilter : any = []
    if (arg == '' || arg.length < 3) return value;
    value.forEach((p: any) => {
      if ( p.title.toLowerCase().indexOf( arg.toLowerCase() ) > -1 ) {
        resultFilter.push(p)
      }
    });
    return resultFilter;    
  }

}
