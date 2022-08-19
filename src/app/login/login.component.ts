import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';

import { AlertMessageService } from '../alert-message.service';

import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSubmitting : boolean = false;
  model : User = new User(-1, '', '', '', '');

  constructor(
    private router: Router, 
    private alertMessageService: AlertMessageService, 
    private http: HttpClient, 
    private loginService : LoginService) { }

  enableSubmitting() {
    this.isSubmitting = true;
  }

  disableSubmitting() {
    this.isSubmitting = false;
  }

  validateUser(): boolean {
    console.log(this.model);
    if(this.model.username && this.model.password) {
      return true;
    }
    return false;
  }

  login(): void {
    this.enableSubmitting();

    if(this.validateUser()) {
      this.loginService.login(this.model)
      .subscribe(loggedIn => {
        if(loggedIn) {
          this.alertMessageService
          .exibeSucesso(`Usuário ${this.model.username} autenticado`)
          .subscribe(_ => this.router.navigate(['/home']));
        } else {
          this.alertMessageService
          .exibeFalhaValidacao('Login inválido')
          .subscribe(_ => this.disableSubmitting());
        }
      });
    } else {
      this.alertMessageService
      .exibeErro(`Usuário inválido. Tente novamente`)
      .subscribe(_ => this.disableSubmitting());
    }
  }

}
