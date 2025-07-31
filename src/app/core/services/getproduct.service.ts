import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { enviroment } from '../enviroment/inviroment';


@Injectable({
  providedIn: 'root'
})
export class GetproductService {

  
  constructor(private httpClient:HttpClient) { }
   getproduct(): Observable <any>{
    return this.httpClient.get(`${enviroment.baseurl}/api/v1/products`)
  }
    getSpecifecPro(id:string):Observable<any>{
     return this.httpClient.get(`${enviroment.baseurl}/api/v1/products/${id}`)

  }
  
  getmoreProducts():Observable<any> {
    return this.httpClient.get(`${enviroment.baseurl}/api/v1/products?page=2`)
  }
}
