import { NavigationStart, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Client';
  isLogin: boolean = false;
  subscription = new Subscription();

  constructor(private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
    });
    // Disable right-click
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.onkeydown = (e) => {
      // if (e.key === 'F12') {
      //   return false;
      // }
      if (e.ctrlKey && e.shiftKey && e.key == 'I') {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.key == 'C') {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.key == 'J') {
        return false;
      }
      if (e.ctrlKey && e.key == 'u') {
        return false;
      }
      if (e.ctrlKey && e.key == 's') {
        return false;
      }
      return true;
    };

    /** TO DISABLE SCREEN CAPTURE **/
    document.addEventListener('keyup', (e) => {
      if (e.key == 'PrintScreen') {
        navigator.clipboard.writeText('');
        alert('Screenshots disabled!');
      }
    });

    /** TO DISABLE PRINTS WHIT CTRL+P **/
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key == 'p') {
        alert('This section is not allowed to print or export to PDF');
        e.cancelBubble = true;
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });
  }

  ngOnInit(): void {
    sessionStorage.getItem('Token') == null
      ? (this.isLogin = true)
      : (this.isLogin = false);
  }
}
