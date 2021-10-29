import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceApiAmazonService } from 'src/app/service/service-api-amazon.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  public productos : any
  public categorias : any
  public filtroBusqueda = ''

  constructor(
    private amazonApiService : ServiceApiAmazonService,
    private spinner: NgxSpinnerService
  ) { 
    this.filtroBusqueda = 'men'

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
      console.log(err);
      this.spinner.hide()
    });
  }

}
