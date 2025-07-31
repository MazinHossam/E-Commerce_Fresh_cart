import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { Whishlist } from '../../shared/interface/whishlist';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-allwhishlist',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './allwhishlist.component.html',
  styleUrl: './allwhishlist.component.scss'
})
export class AllwhishlistComponent implements OnInit {

  wishlistService = inject(WishlistService);
  toastr = inject(ToastrService);
  router = inject(Router);
 idd=inject(PLATFORM_ID)
  likedProducts: any;
  allWhishlist: Whishlist = {} as Whishlist;

  ngOnInit(): void {
  //    if(isPlatformBrowser(this.idd)){
  
  
  //     const token = localStorage.getItem('mytoken'); 
  //     if (token) {
  //       this.fetchWishlist();
  //     } 
    
  // }
 this.wishlistService.allwhishlist().subscribe({
  next: (res) => {
    // console.log('Token موجود؟');
    // console.log('Res:', res.data);
      this.allWhishlist = res; // 
  }
});
  }



  loadproduct():void { 
    this.router.navigate(['/products']);
  }
  trackById(index: number, item: any) {
  return item._id;
}


  remove(id: string):void {
    this.wishlistService.removeFromWishlist(id).subscribe({
      next: (res) => {
        if (this.allWhishlist.data) {
          this.allWhishlist.data = this.allWhishlist.data.filter(item => item._id !== id);
          this.toastr.success('Item removed from wishlist');
        }
      },
      error: (err) => {
        // console.error('Error removing item:', err);
        this.toastr.error('Failed to remove item');
      }
    });
  }

}
