import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MsjerrorService {
  constructor(private toast: ToastrService) {}

  msjErrors(e: HttpErrorResponse) {
    console.log(e);
    if (e.error.Error) {
      this.toast.error(e.error.Error, 'Error');
    } else {
      this.toast.error('Upps algo ocurrio!!!', 'Error');
    }
  }
}
