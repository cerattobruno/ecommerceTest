import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServiceApiAmazonService } from 'src/app/service/service-api-amazon.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  public productos : any
  public categorias : any

  constructor(
    private amazonApiService : ServiceApiAmazonService,
  ) { 
    let p: any = localStorage.getItem('productos')
    this.productos = JSON.parse(p)
  }

  ngOnInit(): void {
    this.searchCategories();
  }

  searchCategories(){
    this.amazonApiService.getCategories().then( resp => {
      this.categorias = resp['data'];
      console.log(resp, this.categorias);
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

}
