import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlertMessage } from './alert-message';

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {

  constructor(private toastrService: ToastrService) { }

  showSuccess(alert: AlertMessage) : void {
    this.toastrService.success(alert.message, alert.title);
  }

  showWarning(alert: AlertMessage) : void {
    this.toastrService.warning(alert.message, alert.title);
  }

  showError(alert: AlertMessage) : void {
    this.toastrService.error(alert.message, alert.title);
  }
}
