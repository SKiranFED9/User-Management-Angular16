import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'User-Management';
  hideAddButton  = false;

  constructor(private route : Router) {
    this.hideAddButton = false;
  }
  addUser() {
    this.route.navigate(["/main-user-page/create"]);
    this.hideAddButton = true;
  }
  homePage() {
    this.hideAddButton = false;
    this.route.navigate(["/main-user-page/home"]);
  }
}
