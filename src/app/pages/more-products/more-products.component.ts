import { Component, inject, OnInit } from '@angular/core';
import { GetproductService } from '../../core/services/getproduct.service';
import { Moreproduct } from '../../shared/interface/moreproduct';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import Aos from 'aos';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-more-products',
  imports: [RouterLink],
  templateUrl: './more-products.component.html',
  styleUrl: './more-products.component.scss'
})
export class MoreProductsComponent implements OnInit {
toastr=inject(ToastrService)
router=inject(Router)
getproductService=inject(GetproductService)
cartService=inject(CartService)
wishlistService=inject(WishlistService)
more:Moreproduct[]=[]

  ngOnInit(): void {
    this.getproductService.getmoreProducts().subscribe({
        next:(res)=>{ 
  // console.log(res.data);
  this.more=res.data
  // console.log(this.more)
   Aos.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });  
},
    error:(err)=>{
      // console.log(err
    }
  })
  }
  callcart(id:string){
this.cartService.AddProductCart(id).subscribe({
  next:(res)=>{
    // console.log(res)
      this.toastr.success( res.message ,'Fresh Cart!');

  },error:(err)=>{
    // console.log(err)
          this.toastr.error('Fresh Cart!', "oops! please try again later" )

  }
})
}
  back(){
  this.router.navigate(['/products'])
  }



  likedProducts = new Set<string>();

toggleLike(productId: string) {
  if (this.likedProducts.has(productId)) {
    this.likedProducts.delete(productId);
    this.removeFromWishlist(productId);
  } else {
    this.likedProducts.add(productId);
    this.addToWishlist(productId);
  }
}

addToWishlist(productId: string) {
  this.wishlistService.addToWishlist(productId).subscribe({
    next: (res) => {
      this.toastr.success("Added to Wishlist", 'Done!');
      // console.log(res);
    },
    error: () => {
      this.toastr.error("Failed to add to Wishlist", "Error");
    }
  });
}

removeFromWishlist(productId: string) {
  this.wishlistService.removeFromWishlist(productId).subscribe({
    next: (res) => {
      // console.log(res);
      this.toastr.success("Removed from Wishlist", 'Done!' );

    }
  })
      // this.toastr.error("remove to Wishlist");
}
}
