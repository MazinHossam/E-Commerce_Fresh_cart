import { Observable } from 'rxjs';
import { enviroment } from './../enviroment/inviroment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordService {

  constructor(private httpClient:HttpClient) { }

  forgotPassword(data:any):Observable<any>{
    return this.httpClient.post(`${enviroment.baseurl}/api/v1/auth/forgotPasswords`,data)
  }
  resetCode(data:string):Observable<any>{
    return this.httpClient.post(`${enviroment.baseurl}/api/v1/auth/verifyResetCode`,data)
  }
  resetPassword(data:string):Observable<any>{
    return this.httpClient.put(`${enviroment.baseurl}/api/v1/auth/resetPassword`,data)
  }

}
