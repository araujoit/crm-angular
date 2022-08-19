import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private loginService : LoginService) { }

  ngOnInit(): void {
  }

  logout() : void {
    // TODO: make request to logout api and redirect to login, otherelse 
    this.loginService.logout()
    .subscribe(loggedOut => {
      if(loggedOut) {
        this.router.navigate([ '/login' ]);
      }
    });
  }

}
