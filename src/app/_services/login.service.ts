import { Injectable } from '@angular/core';
declare const toastr: any;

@Injectable()
export class LoginService {
  authorized = false;

  constructor() {
    this.authorized = localStorage.getItem('authorized') === 'true';
    toastr.options = {
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    };
  }

  login(data) {
    if (data.login === 'admin' && data.password === '123') {
      localStorage.setItem('authorized', 'true');
      this.authorized = true;
      window.location.href = "/";
      return true;
    } else {
      toastr.error('Error', 'Password or login is invalid');
      return false;
    }
  }
}
