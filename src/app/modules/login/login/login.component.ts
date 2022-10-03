import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogged: boolean;
  hasLogin = true;
  formSignup!: FormGroup;
  formSignin!: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.isLogged = this.authService.isLogged();
  }

  ngOnInit(): void {
    this.buildFormSignup();
    this.buildFormSignin();
    if (this.isLogged)
      this.router.navigate(['/home']);
  }

  buildFormSignup() {
    this.formSignup = this.formBuilder.group({
      name: [null, Validators.required],
      login: [null, Validators.required],
      cpf: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  buildFormSignin() {
    this.formSignin = this.formBuilder.group({
      login: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  displayViewPassword() {
    console.log('test');
  }

  submitSignin() {
    this.authService.signIn();
  }

  submitSignup() {

  }

}
