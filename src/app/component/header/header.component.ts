import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user : any = {};
  constructor(private router: Router, private users: UserService) { }

  ngOnInit(): void {
    this.getUsername();
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }

  getUsername() {
    this.users.getUser(2).subscribe({
      next: (data)=> {
        this.user = data;
      }
    })
  }

}
