import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  isLogged = false;
  constructor(private router: Router){}
  goHome(): void {
    if (this.isLogged){
      this.router.navigate(['/courses']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}