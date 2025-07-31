import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const homeguardGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
const ID=inject(PLATFORM_ID)
if(isPlatformBrowser(ID)){
if(localStorage.getItem("mytoken")!==null){

router.navigate(["Home"])

  return false

}else{
  return true
}
}else{
  return false
}

};
