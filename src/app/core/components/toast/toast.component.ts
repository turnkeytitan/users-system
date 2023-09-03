import { Component } from '@angular/core';
import { Toast } from '@core/interfaces/toast.interface';
import { ToastService } from '@core/services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  toast: Observable<Toast | null>;
  constructor(private toastService: ToastService) {
    this.toast = this.toastService.getToast();
  }
  closeToast() {
    this.toastService.hideToast();
  }
}
