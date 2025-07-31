import { inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const id=inject(PLATFORM_ID)
  if(isPlatformBrowser(id)){
if (localStorage.getItem('mytoken') !== null ){

if( req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist')) {
      req=req.clone({
    setHeaders: {
    token: localStorage.getItem('mytoken') !
    }
  })
}

}
  }

  return next(req);
};
