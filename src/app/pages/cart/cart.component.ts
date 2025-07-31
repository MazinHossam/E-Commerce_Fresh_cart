import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';

import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cart } from '../../shared/interface/cart';


@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent  implements OnInit  {

private readonly cartService=inject(CartService)
myCart : Cart ={} as Cart
cart: any;



ngOnInit(): void {
this.cartService.GetUserCart().subscribe({
  next:(res)=>{
    // console.log(res.data)
    // console.log('cartId', res.data._id);

    this.myCart = res.data;
     
  },error:(err)=>{
    // console.log(err)
  }
})
}
RemoveItem(id:string):void{
this.cartService.RemoveItemFromCart(id).subscribe({
  next:(res)=>{
    // console.log(res)
    this.myCart=res.data
  },error:(err)=>{
    // console.log(err)
  }
})
}
UpdateCartQuantity(Quantity:any , id:string):void{
this.cartService.UpdateCartQuantity(Quantity,id).subscribe({
  next:(res)=>{
    // console.log(res)
    this.myCart=res.data
  },error:(err)=>{
    // console.log(err)
  }
})
}
ClearCart():void{
  this.cartService.ClearCart().subscribe({
    next:(res)=>{
      // console.log(res)
      this.myCart=res.data
    },error:(err)=>{
      // console.log(err)
    }
  })
}
}
