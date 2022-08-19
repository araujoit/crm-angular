import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';

import { AlertMessageService } from '../alert-message.service';
import { AlertMessage } from '../alert-message';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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
          //console.log('Submitting user %s', JSON.stringify(this.model));
          this.alertMessageService.showSuccess(new AlertMessage('Sucesso!', `Usuário ${this.model.username} autenticado`));
          this.router.navigate(['/home']);
        } else {
          this.alertMessageService.showWarning(new AlertMessage('Validação!', 'Login inválido'));
          this.disableSubmitting();
        }
      });
    } else {
      //console.log('Ending submit!');
      this.alertMessageService.showError(new AlertMessage('Validação!', `Usuário inválido. Tente novamente`));
      this.disableSubmitting();
    }
  }

}
