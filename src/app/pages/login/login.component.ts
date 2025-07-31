import { HttpClient } from '@angular/common/http';
import { Component,  inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RegisterService } from '../../core/services/register.service';

import { Router, RouterLink } from '@angular/router';
import Aos from 'aos';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

 private readonly registerService=inject(RegisterService)

loginForm:FormGroup = new FormGroup({
 
  email:new FormControl(null, [Validators.required,Validators.email]),
  password:new FormControl (null, [Validators.required,Validators.pattern(/^[a-zA-Z0-9]{6,}$/)]),


} )

spinnier:boolean=false
errorMsg:string=""
sucssesMsg:string=""
private readonly router =inject(Router)


submit(){

if (this.loginForm.valid) {
     this.spinnier=true
    this.registerService.getsignin(this.loginForm.value).subscribe({
    next:(res)=>{
      // console.log(res.message)
      // console.log(res.token)
      localStorage.setItem("mytoken",res.token,)
      
            const payload = JSON.parse(atob(res.token.split('.')[1]));
        const userId = payload.id;
        // console.log(payload.id)
        localStorage.setItem("userId", userId); 
        
      // console.log(userId)
      

      this.registerService.jwttoken()
      this.spinnier=false
           this.errorMsg=""
           this.sucssesMsg=res.message
          //  alert(res.message)
       setTimeout(() =>{
           this.router.navigate(["Home"])
       },2000)
    },
    error:(err)=> {
      // console.log(err.error.message)
         this.spinnier=false
         this.errorMsg=err.error.message
           this.sucssesMsg=""

    }
  })
}else{
  this.loginForm.markAllAsTouched()
}

}



  ngOnInit(): void {
 Aos.init({
      duration: 1000,
      easing: 'ease-in-out',
      once:true,
    });
  }

}
