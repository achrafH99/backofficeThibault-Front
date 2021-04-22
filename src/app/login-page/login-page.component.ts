import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private toastr: ToastrService,
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  errorLogin: boolean = false;

  ngOnInit(): void {}

  login(event) {
    this.authentication
      .getToken(event.target[0].value, event.target[1].value)
      .subscribe(
        (tokens) => {
          this.errorLogin = false;
          this.authentication.tokens = tokens;
          this.router.navigate(['/']);
        },
        (error) => {
          this.authentication.tokens = undefined;
          this.errorLogin = true;
          console.log(error);
          this.toastr.error(error.error.detail, '', {
            tapToDismiss: true,
          });
        }
      );
  }
}
