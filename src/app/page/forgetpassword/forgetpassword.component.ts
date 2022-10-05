import { AuthService } from './../../service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from 'src/app/component/notifier/notifier.component';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  hide = true;
  sendding = false;
  success_message = false; //success message
  error_message = false;

  private token!: string;
  private jwtHelperService = new JwtHelperService();

  constructor(private userservice:UserService,
    private authservice :AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.checkReset();
  }

  submitClick(){
    this.sendding=true;
    this.submitForm();

  }

  checkReset(){
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });

    if (this.token != null && this.token !== '') {
      if (this.jwtHelperService.decodeToken(this.token).sub != null || '') {

        var expireToken = this.jwtHelperService.isTokenExpired(this.token);
        console.log(expireToken);
        if (!expireToken) {
          this.authservice.saveTokenForgotPassword(this.token);
          this.router.navigateByUrl('/resetpassword');
        } else {
          this.authservice.clearToken();
          alert('Something went wrong!');
          this.router.navigateByUrl('/forgotpassword');
        }
      }
    }
  }

  submitForm() {
    if (this.form.valid) {
      this.userservice.ForgotPassword(this.form.value).subscribe({
        next: (data) => {
          this.showSuccessmessage();
        },
        error: (err) => {
          console.log(err);
          this.showErrorMessage();
        }
      });
    }else{
      this.sendding=false;
    }

  }

  openSnackBarFrom(message: string, type: string,duration:number) {
    this._snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: message,
        type: type,
      },
      horizontalPosition: "right",
      verticalPosition: "top",
      duration:duration,
      panelClass: type
    });
  }

  showSuccessmessage(){
    this.sendding=false;
    this.success_message = true;
    setTimeout(() => {
      this.success_message = false;
    }, 5000);
  }
  showErrorMessage(){
    this.sendding=false;
    this.error_message = true;
    setTimeout(() => {
      this.error_message = false;
    }, 5000);
  }

  get email():any{
    return this.form.get('email');
  }

}
