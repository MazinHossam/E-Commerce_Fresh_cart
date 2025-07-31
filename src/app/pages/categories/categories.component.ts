import { Component, inject, OnInit } from '@angular/core';
import { GetcategoryService } from '../../core/services/getcategory.service';
import { Category } from '../../shared/interface/category';
import { GetALLcatSpacefic } from '../../shared/interface/get-allcat-spacefic';
import Aos from 'aos';
@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
getcategoryService=inject(GetcategoryService)

catSpacific:GetALLcatSpacefic[]=[]
  categories:Category[]=[]

  selectetCat:number | null = null;

  ngOnInit(): void {
this.getcategoryService.getcategory().subscribe({
  next:(res)=>{
    // console.log(res);
    this.categories = res.data;
  }
})
  }

  gitSpecificCat(id:string,index:number){
    this.getcategoryService.getallSpacific(id).subscribe({
      next:(res)=>{
        // console.log(res);
        this.catSpacific= res.data;
        this.selectetCat=index
         Aos.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
    });

      },
      error:(err)=>{
        // console.error(err);
      } 
    })
  }
}
