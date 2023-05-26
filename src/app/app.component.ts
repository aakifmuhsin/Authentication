import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'project3';
  displaymenu=false;
  constructor(private cookie:CookieService,private route:Router){

  }
  ngDoCheck(): void {
    switch (this.route.url) {
      case '/login':
      case '/register':
      case '/forgetpassword':
        this.displaymenu = false;
        break;
      default:
        this.displaymenu = true;
        break;
    }
  }
   
  logOut(){
    localStorage.removeItem('token');
  }
  
  
}
