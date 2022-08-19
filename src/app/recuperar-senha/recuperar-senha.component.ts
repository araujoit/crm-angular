import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../user';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent {
  model : User = new User(-1, '', '', '', '');

  constructor(private router : Router, private toastrService: ToastrService) { }

  /**
   * @returns true quando o e-mail é invalido, senão retorna false
   */
  isEmailInvalido() : boolean {
    return false;
  }

  recuperar() : void {
    // se o e-mail não for válido, emite um alerta
    if(!this.model.email) {
      this.toastrService.error('Falha de validação!', `Digite um e-mail válido`);
      return;
    }

    // se o e-mail é invalido, apresenta uma mensagem
    if(this.isEmailInvalido()) {
      this.toastrService.error('Falha de validação!', `O e-mail de recuperação digitado não é valido`);
    } else {
      this.toastrService.success('Alerta!', `Um e-mail de recuperação foi enviado para ${this.model.email}`);
    }
  }
}
