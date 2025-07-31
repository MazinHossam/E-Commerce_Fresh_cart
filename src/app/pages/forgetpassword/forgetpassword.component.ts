import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { ForgetpasswordService } from '../../core/services/forgetpassword.service';
import { RegisterService } from '../../core/services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule,],
        standalone: true,
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
private readonly forgetpasswordService=inject(ForgetpasswordService)
private readonly registerService=inject(RegisterService)
private readonly router=inject(Router)

successMsg:any=""
massageS:any=""


faildMsg:any=""
massageF:any=""


step:any=1
spinnier:boolean=false
forgetPassword:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email])
})

verifyCode:FormGroup= new FormGroup({
resetCode: new FormControl(null,[Validators.required,Validators.pattern(/^\d{5,6}$/)])
})
resetPassword:FormGroup =new FormGroup ({
  email:new FormControl(null,[Validators.required,Validators.email]),
  newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z0-9]{6,}$/)])
})
sendMail(){
  if(this.forgetPassword.valid){
    let resetPasswordValue =this.forgetPassword.get("email")?.value
    this.resetPassword.get("email")?.patchValue(resetPasswordValue)
   this.spinnier=true
    this.forgetpasswordService.forgotPassword(this.forgetPassword.value).subscribe({
  next:(res)=>{
    this.spinnier=false
    // console.log(res)
         this.successMsg=res.statusMsg
     this.massageS=res.message
       this.massageF=""
  this.faildMsg=""
   if(res.statusMsg=="success"){
  setTimeout(() => {
          this.successMsg=""
     this.massageS=""
    this.step = 2;
  }, 1500); 
}
},error:(err)=>{
  // console.log(err)
  this.spinnier=false
  this.massageF=err.message
  this.faildMsg=err.statusMsg
      this.successMsg=""
     this.massageS=""
}
})
  }

}
 sendcode(){
  if(this.verifyCode.valid){
   this.spinnier=true
      this.forgetpasswordService.resetCode(this.verifyCode.value).subscribe({
    next:(res)=>{
      this.spinnier=false
      this.successMsg=res.status

        this.faildMsg=""
  this.massageF=""

      // console.log(res)
      if(res.status == "Success"){

        setTimeout(()=>{
              this.successMsg=""

 this.step=3
        },1500)
       
          
      }
    },
    error:(err)=>{
  // console.log(err)
  this.spinnier=false
  this.faildMsg=err.error.statusMsg
  this.massageF=err.error.message
     this.successMsg=""
}
  })
}

 }


 ResetPassword(){
  if(this.resetPassword.valid){
    this.spinnier=true
    this.forgetpasswordService.resetPassword(this.resetPassword.value).subscribe({
  next:(res)=>{
    this.spinnier=false
    // console.log(res)
 localStorage.setItem("mytoken",res.token)
      this.registerService.jwttoken()
        this.faildMsg=""
  this.massageF=""
  
     setTimeout(() =>{
           this.router.navigate(["login"])
           
       },2000)
  },error:(err)=>{
  // console.log(err)
  this.spinnier=false
  this.faildMsg=err.error.statusMsg
  this.massageF=err.error.message
}
})
  }

 }
}
