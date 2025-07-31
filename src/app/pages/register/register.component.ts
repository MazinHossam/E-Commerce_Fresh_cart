import { HttpClient } from '@angular/common/http';
import { Component,  inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RegisterService } from '../../core/services/register.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
    standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'})

export class RegisterComponent {

 private readonly registerService=inject(RegisterService)
 private readonly router =inject(Router)

registerforms:FormGroup = new FormGroup({
     name: new FormControl(null, [Validators.required, Validators.minLength(3),Validators.maxLength(25),]),
  email:new FormControl(null, [Validators.required,Validators.email]),
  password:new FormControl (null, [Validators.required,Validators.pattern(/^[a-zA-Z0-9]{6,}$/)]),
  rePassword :new FormControl(null,[Validators.required]),
  phone :new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),

},{validators : this.repass} )

spinnier:boolean=false
errorMsg:string=""
sucssesMsg:string=""




submit(){

if (this.registerforms.valid) {
     this.spinnier=true
    this.registerService.getsignup(this.registerforms.value).subscribe({
    next:(res)=>{
      // console.log(res.message)
      this.spinnier=false
           this.errorMsg=""
           this.sucssesMsg=res.message
          this.router.navigate(["/login"])
    },
    error:(err)=> {
      // console.log(err.error.message)
         this.spinnier=false
         this.errorMsg=err.error.message
           this.sucssesMsg=""

    }
  })
}else{
  this.registerforms.markAllAsTouched()
}

}

repass(grop:AbstractControl){
  const pass=grop.get("password")?.value
  const repass=grop.get("rePassword")?.value
  if (pass===repass) {
    return null 
  
  }else{
    return {mismatch:true}
  }
}
}
