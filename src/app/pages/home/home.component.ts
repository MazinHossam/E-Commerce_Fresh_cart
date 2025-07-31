import { GetcategoryService } from './../../core/services/getcategory.service';
import { Iproduct } from './../../shared/interface/iproduct';
import { Component, inject, Inject, OnInit, Pipe } from '@angular/core';
import { GetproductService } from '../../core/services/getproduct.service';
import { Category } from '../../shared/interface/category';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

import Aos from 'aos';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink , SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
private readonly  ngxSpinnerService=inject(NgxSpinnerService)
private readonly  getcategoryService=inject(GetcategoryService)
private readonly  getproductService=inject(GetproductService)
private readonly  cartService=inject(CartService)
private readonly  toastr=inject(ToastrService)


myproduct:Iproduct[]=[]
mycategory:Category[]=[]
id:string=""

searchItem:any=""

 


customOptions = {
    mouseDrag:true,
  loop: true,
  margin: 5,
touchDrag:true,
  nav:true ,
  navText:[`<i class="fa-solid fa-arrow-left fa-beat text-green-700 dark:text-black "></i>`,`<i class="fa-solid fa-arrow-right fa-beat text-green-700 dark:text-black "></i>`],
  dots: false,
  autoplay:true,
autoplayTimeout:2000,
smartSpeed:700,

  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1000: {
      items: 7
    }
  }
};
mainOptions = {
    mouseDrag:true,
  loop: true,
  margin: 0,
touchDrag:true,
  nav:true ,
  navText:[`<i class="fa-solid fa-arrow-left fa-beat text-green-700 dark:text-black "></i>`,`<i class="fa-solid fa-arrow-right fa-beat text-green-700 dark:text-black "></i>`],
  dots: false,
  autoplay:true,
autoplayTimeout:3000,
smartSpeed:700,
items:1,
};
callproduct(){
  this.getproductService.getproduct().subscribe({
       next:(res)=>{
        // console.log(res.data)
 this.myproduct=res.data
    },
    // error:(err)=>{
    //   console.log(err)
    // }

  });
}
callcategory(){
    this.getcategoryService.getcategory().subscribe({
    next:(res)=>{
              // console.log(res.data)
 this.mycategory=res.data
    },
    //    error:(err)=>{
    //   console.log(err)
    // }
  })
}
ngOnInit(): void {
this.callproduct()
this.callcategory()
 Aos.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });


}
callcart(id:string){
  this.ngxSpinnerService.show()
this.cartService.AddProductCart(id).subscribe({
  next:(res)=>{
    // console.log(res)
        this.toastr.success( res.message ,'Fresh Cart!');
          this.ngxSpinnerService.hide()
  },error:(err)=>{
    // console.log(err)
        this.toastr.error('Fresh Cart!', "oops! please try again later" )
  }

})
}
  

}


