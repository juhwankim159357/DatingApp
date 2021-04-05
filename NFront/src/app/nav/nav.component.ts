import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  // dependency injection
  constructor(public authService: AuthService, private alertify:AlertifyService, private router:Router ) { }

  ngOnInit() {
  }

  // after successful login, please make sure token is saved in local storage
  
login() {
    
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error('Failed to login');
    },
    ()=>{
        this.router.navigate(['/members']);
    });

  }

  loggedIn() {
    //const token = localStorage.getItem('token');
    //return !!token; // !! means retrun true of false
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');

    this.router.navigate(['/home']);
  }

}