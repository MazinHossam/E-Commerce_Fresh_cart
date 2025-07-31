import { Brand } from './../../shared/interface/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { GetbrandsService } from '../../core/services/getbrands.service';
import { Brands } from '../../shared/interface/brands';
import Aos from 'aos';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

private readonly getbrandsService=inject(GetbrandsService)

myBrands:Brands[]=[]

selectedBrand: any = null;
brand: any;

selectedBrandId: string | null = null;

selectBrand(brandId: string) {
  this.selectedBrandId = brandId;
}

closeModal(id:string) {
  this.selectedBrand = "";
}
ngOnInit(): void {
  this.getbrandsService.getbrand().subscribe({
    next:(res)=>{
      // console.log(res.data)
      this.myBrands=res.data

    }
  })
   Aos.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: false,
      });
}


}
