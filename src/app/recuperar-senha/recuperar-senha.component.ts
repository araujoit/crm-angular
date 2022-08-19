import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss']
})
export class RecuperarSenhaComponent implements OnInit {
  model : User = new User(-1, '', '', '');

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  recuperar() : void {
    console.log('Recuperando a senha...');
  }
}
