import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/inviroment';

@Injectable({
  providedIn: 'root'
})
export class GetbrandsService {

  constructor(private httpClient:HttpClient ) { }
  getbrand():Observable<any>{
    return this.httpClient.get(`${enviroment.baseurl}/api/v1/brands`)
  }
}
