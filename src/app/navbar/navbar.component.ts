import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../_models/UserInfo';
import { User } from '../_models/User';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: User;
  currentUserInfo: UserInfo;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUserInfo.subscribe(info => this.currentUserInfo = info);
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }
  loggedIn() {
    if (this.currentUser && this.currentUser.token && this.currentUserInfo){
      return true;
    }
    return false;
  }

  logout() {
    this.authenticationService.logout();
  }

  ngOnInit() {
  }

}
