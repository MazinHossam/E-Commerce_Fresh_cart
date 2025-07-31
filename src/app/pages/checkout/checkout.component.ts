import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentService } from '../../core/services/payment.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  checkpayforms:any
  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly paymentService=inject(PaymentService)
  cart_id:any
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.cart_id=res.get('id')
        // console.log(this.cart_id)
      },error:(err)=>{
        // console.log(err)
      }
    })
    this.checkpayforms = new FormGroup({
     
      details:new FormControl(null, [Validators.required]),
      phone:new FormControl (null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
           city:new FormControl(null, [Validators.required]),
    
    
    } )
  }
  supmitform():void{
    console.log(this.checkpayforms.value)
    this.paymentService.payment(this.checkpayforms.value,this.cart_id).subscribe({
      next:(res)=>{
        // console.log(res)
        if(res.status==="success"){
          window.open(res.session.url, 'self')
        }
        
       
      },error:(err)=>{
        // console.log(err)
      }
    })
  
  }

}
