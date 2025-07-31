import { Router } from '@angular/router';
import { enviroment } from './../enviroment/inviroment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  constructor(private httpClient:HttpClient , private router:Router) {}
  user:any ;

  getsignup(data: object):Observable <any>{
    return this.httpClient.post(`${enviroment.baseurl}/api/v1/auth/signup`,data)
  }
  getsignin(data: object):Observable <any>{
    return this.httpClient.post(`${enviroment.baseurl}/api/v1/auth/signin`,data)
  }
  jwttoken():void{
    this.user =jwtDecode(localStorage.getItem("mytoken")!)
    console.log(this.user)
  }
signout(){
localStorage.removeItem("mytoken")
this.user=null
this.router.navigate(["login"])

}
}

