
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NotifierComponent } from './component/notifier/notifier.component';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  user_role!: string;

  constructor(private authservice:AuthService,private _snackBar: MatSnackBar,private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
      if(this.checkAuth()){
        return true;
      }else{
        this.router.navigate([`/`]);
        return false;
      }

  }
  checkAuth():boolean{
    try {
      this.user_role = this.authservice.getUserInfo().userRole.name;
      if(this.user_role == "CANDIDATE"){
        return true;
      }else{
        this.openSnackBarFrom("Please Login as a candidate","error");
        return false;
      }

    } catch (error) {
      return false;
    }
  }

  openSnackBarFrom(message: string, type: string) {
    this._snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: message,
        type: type,
      },
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 4000,
      panelClass: type
    });
  }

}
