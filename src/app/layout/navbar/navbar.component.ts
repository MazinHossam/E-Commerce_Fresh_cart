import { Component, input, inject ,HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RegisterService } from '../../core/services/register.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLinkActive , RouterLink, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  {
    title = 'E-Commerce';
      constructor(private flowbiteService:  FlowbiteService,public registerService:RegisterService) {}
  islogin=input<any>(true)



    ngOnInit(): void {
      this.flowbiteService.loadFlowbite((flowbite) => {
        initFlowbite();
      });

}
  isScrolled = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > 10;
  }


  isDark = false;

  toggleDarkMode() {
    this.isDark = !this.isDark;
    document.documentElement.classList.toggle('dark');
  }



}
