import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { WishlistService } from './../../core/services/wishlist.service';
import { GetproductService } from '../../core/services/getproduct.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { Iproduct, Category } from '../../shared/interface/iproduct';
import Aos from 'aos';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  imports: [RouterLink]
})
export class ProductsComponent implements OnInit {
  toastr = inject(ToastrService);
  getproductService = inject(GetproductService);
  cartService = inject(CartService);
  router = inject(Router);
  wishlistService = inject(WishlistService);

  myproduct: Iproduct[] = [];
  mycategory: Category[] = [];
  searchItem: any = "";
  likedProducts = new Set<string>();
 idd=inject(PLATFORM_ID)
 ngOnInit(): void {
  this.callproduct();
  this.getWishlist(); 
  Aos.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: false,
  });

  // Load liked products from localStorage
  if (isPlatformBrowser(this.idd)) {
     const savedLikes = localStorage.getItem('likedProducts');
  if (savedLikes) {
    this.likedProducts = new Set(JSON.parse(savedLikes));
  }
  }

}


  callproduct() {
    this.getproductService.getproduct().subscribe({
      next: (res) => this.myproduct = res.data,
    });
  }

 getWishlist() {
  this.wishlistService.allwhishlist().subscribe({
    next: (res) => {
      if (res?.data) {
        this.likedProducts = new Set(res.data.map((item: any) => item._id));

        // Sync with localStorage
        localStorage.setItem('likedProducts', JSON.stringify(Array.from(this.likedProducts)));
      }
    }
  });
}

  callcart(id: string) {
    this.cartService.AddProductCart(id).subscribe({
      next: (res) => this.toastr.success(res.message, 'Fresh Cart!'),
      error: () => this.toastr.error('Fresh Cart!', "oops! please try again later")
    });
  }

toggleLike(productId: string) {
  if (this.likedProducts.has(productId)) {
    this.likedProducts.delete(productId);
    this.removeFromWishlist(productId);
  } else {
    this.likedProducts.add(productId);
    this.addToWishlist(productId);
  }

  // Save to localStorage
  localStorage.setItem('likedProducts', JSON.stringify(Array.from(this.likedProducts)));
}


  addToWishlist(productId: string) {
    this.wishlistService.addToWishlist(productId).subscribe({
      next: () => this.toastr.success("Added to Wishlist", 'Done!'),
      error: () => this.toastr.error("Failed to add to Wishlist", "Error")
    });
  }

  removeFromWishlist(productId: string) {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: () => this.toastr.success("Removed from Wishlist", 'Done!'),
      error: () => this.toastr.error("Failed to remove from Wishlist", "Error")
    });
  }

  loadMore() {
    this.router.navigate(['/more-products']);
  }
}
