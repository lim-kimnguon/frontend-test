import { AuthService } from './../../service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierComponent } from 'src/app/component/notifier/notifier.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('',[Validators.required, Validators.minLength(4)])
  });


  hide = true;
  loginerror = false;

  getErrorMessage() {
    if (this.form.hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(private userservice: UserService, private authservice: AuthService,  private router: Router) { }


  ngOnInit(): void {
  }

  loginclick(){
    this.userlogin();
  }

  userlogin(){
    if (this.form.valid) {
      this.userservice.login(this.form.value).subscribe({
        next: (data)=>{

          this.authservice.saveToken(data.headers.get('Jwt-Token'));
          this.authservice.saveUserInfo(data.body);

          window.location.assign('/home');

        },
        error: (error)=>{
          this.loginerror = true;
          console.log(error);
        }
      })
    }
  }


  get email():any{
    return this.form.get('email');
  }
  get password():any{ return this.form.get('password'); }


}
