import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isSubmitting: boolean = false;
  model : User = new User(-1, '', '', '', '');

  constructor(private router: Router, private toastrService: ToastrService) { }

  enableSubmitting() {
    this.isSubmitting = true;
  }

  disableSubmitting() {
    this.isSubmitting = true;
  }

  ngOnInit(): void {
    
  }

  validateUser(): boolean {
    if(this.model) {
      return true;
    }
    return false;
  }

  login(): void {
    this.enableSubmitting();

    if(this.validateUser()) {
      console.log('Submitting user %s', JSON.stringify(this.model));
      this.toastrService.success('Sucesso!', `Usuário ${this.model.username} autenticado`);
      this.router.navigate(['/home']);
    } else {
      console.log('Ending submit!');
      this.disableSubmitting();
    }
  }

}
