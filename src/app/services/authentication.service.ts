import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  tokens: any;
  constructor(private http: HttpClient) {}

  public getToken(username, password) {
    // return this.http.get("./assets/data/products.json");
    return this.http
      .post('http://localhost:8000/token/', {
        username: username,
        password: password,
      })
  }

  public hasToken(): boolean {
    return this.tokens != undefined;
  }

}
