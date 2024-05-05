// import { Component } from '@angular/core';

// import { Router } from '@angular/router';

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {

  }
  register() {
    this.router.navigate(['/register']);
    console.log('Register button clicked');
  }

  login() {
    this.router.navigate(["/login"]);
    window.alert("dsdgfsdg");
  }
  showData() {

  }
}
