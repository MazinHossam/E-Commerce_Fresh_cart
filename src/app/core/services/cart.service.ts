import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/inviroment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }


  AddProductCart(id:string):Observable<any>{
    return this.httpClient.post(`${enviroment.baseurl}/api/v1/cart`,
 {
    "productId": id
})

  }
  GetUserCart():Observable<any>{
    return this.httpClient.get(`${enviroment.baseurl}/api/v1/cart`
     
    )
  }
 RemoveItemFromCart (id:string):Observable<any>{
  return this.httpClient.delete(`${enviroment.baseurl}/api/v1/cart/${id}`,
    
   );
 }
 UpdateCartQuantity(Quantity:string , id:string):Observable<any>{
  return this.httpClient.put(`${enviroment.baseurl}/api/v1/cart/${id}`,
    {
    "count": Quantity
}

  )
 }
 
 ClearCart():Observable<any>{
  return this.httpClient.delete(`${enviroment.baseurl}/api/v1/cart`,
   
  )
}
}
