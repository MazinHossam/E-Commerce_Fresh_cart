import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RegisterService } from '../../core/services/register.service';
import { PaymentService } from '../../core/services/payment.service';
// import { cart } from '../../shared/interface/cart';
import { Router, RouterLink } from '@angular/router';
import { Allproduct } from '../../shared/interface/allproduct';
import { Cart } from '../../shared/interface/cart';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {


private readonly registerService = inject(RegisterService);
private readonly paymentService = inject(PaymentService);
private readonly router = inject(Router);
myorder: Cart = {} as Cart;
id: string = "";
orders: Allproduct[] = [] 
viewContainerRef: any;

 idd=inject(PLATFORM_ID)


ngOnInit(): void {
  if(isPlatformBrowser(this.idd)){
      this.paymentService.allorders(localStorage.getItem("userId")).subscribe({
next: (res) => {
  // console.log(res) 
 this.orders=res
//  console.log(this.orders)
}
  })

   }



}



}



