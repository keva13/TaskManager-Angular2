import {Component, Injectable} from '@angular/core';
import {LoginService} from '../_services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable()
export class LoginComponent {
  disabled = false;
  data = {
    login : '',
    password: ''
  };

  constructor(public _loginService: LoginService) {

  }

  login() {
    this.disabled = true;
    this._loginService.login(this.data);
    this.disabled = false;
  }

}
