import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {
    this.getProducts().subscribe(data => {
      console.log(data);
    });
  }


  public getProducts(): Observable<any> {
    return this.http.get("./assets/data/products.json");
  }
}
