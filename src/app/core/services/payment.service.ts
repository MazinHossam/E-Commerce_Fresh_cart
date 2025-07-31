import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/inviroment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  constructor(private httpClient:HttpClient) { }

  payment(data:object , id:string):Observable<any>{
    return this.httpClient.post(`${enviroment.baseurl}/api/v1/orders/checkout-session/${id}?url=${window.location.origin}`,
      {
         "shippingAddress":data
      
        
      }
    )
  }

allorders(userId:any): Observable<any> {

  return this.httpClient.get(`${enviroment.baseurl}/api/v1/orders/user/${userId}`);
}


}
