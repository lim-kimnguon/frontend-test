import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  saveToken(token: any) {
    sessionStorage.setItem('Token', token);
  }
  getToken(): any {
    return sessionStorage.getItem('Token');
  }
  removeToken() {
    sessionStorage.removeItem('Token');
  }


  saveUserInfo(user: any) {
    let user_data = JSON.stringify(user);
    sessionStorage.setItem('User', user_data);
  }
  getUserInfo(): any {
    let get_user = sessionStorage.getItem('User');
    let user_data = JSON.parse(get_user + '');
    return user_data;
  }
  removeUserInfo() {
    sessionStorage.removeItem('User');
  }




  saveTokenForgotPassword(token: any) {
    sessionStorage.setItem('Forgotpassword', token);
  }
  getTokenForgotPassword(): any {
    return sessionStorage.getItem('Forgotpassword');
  }
  clearForgotpasswordToken() {
    sessionStorage.removeItem('Forgotpassword');
  }

  logout(): void {
    sessionStorage.clear();
  }
  clearToken(): void {
    sessionStorage.clear();
  }


  isAdmin(): boolean {
    let user = this.getUserInfo();

    if (user.userRole.name == "ADMIN") {
      return true;
    } else {
      return false;
    }

  }

}
