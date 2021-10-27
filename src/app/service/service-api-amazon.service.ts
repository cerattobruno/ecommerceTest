import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class ServiceApiAmazonService {

  constructor() { }

  async getProducts(){
    let url = 'https://fakestoreapi.com/products';

    return axios.get(url)
  }

  async getCategories(){
    let url = 'https://fakestoreapi.com/products/categories';

    return axios.get(url)
  }


}
