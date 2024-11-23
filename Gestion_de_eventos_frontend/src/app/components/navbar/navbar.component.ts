import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  existeToken = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.existeToken = !!token;
  }

  logout() {
    localStorage.removeItem('token');
    this.existeToken = false;
    this.router.navigate(['/login']);
  }
}
