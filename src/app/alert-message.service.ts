import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {

  constructor(private toastrService: ToastrService) { }

  exibeSucesso(msg: string) : Observable<boolean> {
    this.clear();
    this.toastrService.success(msg, 'Sucesso!');
    return of(true);
  }

  exibeFalhaValidacao(msg: string) : Observable<boolean> {
    this.toastrService.warning(msg, 'Validacao!');
    return of(true);
  }

  exibeErro(msg: string) : Observable<boolean> {
    this.toastrService.error(msg, 'Erro!');
    return of(true);
  }

  clear() : void {
    this.toastrService.clear();
  }
}
