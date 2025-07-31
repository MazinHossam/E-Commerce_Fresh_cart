import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/inviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpClient:HttpClient) { }


  addToWishlist(productId: string):Observable<any>{
    return this.httpClient.post(`${enviroment.baseurl}/api/v1/wishlist`,
{
    "productId": productId
} );}

removeFromWishlist(productId: string):Observable<any>{
  return this.httpClient.delete(`${enviroment.baseurl}/api/v1/wishlist/${productId}`)
}

allwhishlist():Observable<any>{
  return this.httpClient.get(`${enviroment.baseurl}/api/v1/wishlist`)

}

}
