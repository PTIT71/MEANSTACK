import { Moto } from './moto';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MotoService {

  private _getAllProduct = "http://localhost:3000/api/getAllProduct";


  constructor(private _http: Http) { }

  getProducts() {
    return this._http.get(this._getAllProduct)
      .map((response: Response) => response.json());
  }

 

}
