import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  productsUrl: string;
  categoriesUrl: string;
  employeesUrl: string;

  public products: Product[];
  public categories: Category[];

  constructor(private http: HttpClient) {

    this.productsUrl = 'Products?$format=json';
    this.categoriesUrl = 'Categories?$format=json';
    this.employeesUrl = 'Employees?$format=json';
  }


  getProducts(webApiUrl: string): any {
    return this.http.get(webApiUrl + this.productsUrl);
  }


  getCategories(webApiUrl: string): any {
    return this.http.get(webApiUrl + this.categoriesUrl);
  }

  getEmployees(webApiUrl: string): any {
    return this.http.get(webApiUrl + this.employeesUrl);
  }


}
