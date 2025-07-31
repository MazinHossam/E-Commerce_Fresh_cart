import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/inviroment';

@Injectable({
  providedIn: 'root'
})
export class GetcategoryService {


  constructor(private httpClient:HttpClient) { }
  getcategory():Observable<any>{
     return this.httpClient.get(`${enviroment.baseurl}/api/v1/categories`)

  }
  getspecificcat(id:string):Observable<any>{
     return this.httpClient.get(`${enviroment.baseurl}/api/v1/categories/ ${id} `)

  }
  getallSpacific(id:string):Observable<any>{
    return this.httpClient.get(`${enviroment.baseurl}/api/v1/categories/${id}/subcategories`)
  }
}
