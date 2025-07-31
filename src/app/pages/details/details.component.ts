import { GetproductService } from './../../core/services/getproduct.service';
import { resolve } from 'node:path';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../shared/interface/iproduct';
  import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  toastr=inject(ToastrService)
private readonly getproductService=inject(GetproductService)
private readonly cartService=inject(CartService)
  activatedRoute=inject(ActivatedRoute)
prod_Id:any;

prodData:Iproduct={} as Iproduct

  ngOnInit(): void{

  this.activatedRoute.paramMap.subscribe({

    next:(res)=>{
this.prod_Id=res.get("id")
console.log(this.prod_Id)
this.getproductService.getSpecifecPro(this.prod_Id).subscribe({
  next:(res)=>{
  this.prodData=res.data
  // console.log(this.prodData)
  }
})


    },error:(err)=>{
// console.log(err)

    }
    
  })

}
addtocart():void{
  this.cartService.AddProductCart(this.prod_Id).subscribe({
  next:(res)=>{
    // console.log(res)
     this.toastr.success( res.message ,'Fresh Cart!');
  },error:(err)=>{
    // console.log(err)
    this.toastr.error('Fresh Cart!', "oops! please try again later" )
  }
})

}


}
