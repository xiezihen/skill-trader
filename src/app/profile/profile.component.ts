import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserInfo } from '../_models/UserInfo';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../_services/authentication.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: UserInfo;
  editText: string;
  hasName: boolean;
  hasCity: boolean;
  basicEdit: boolean;
  skillEdit: boolean;
  aboutEdit: boolean;
  mySkills: Array<object>;
  newAbout: string;
  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient

  ) {
    this.authenticationService.currentUserInfo.subscribe(info => this.userInfo = info);
    enum category {
        arts = 'Arts',
        crafts = 'Crafts',
        Outdoor = 'Outdoor Recreation',
        sports = 'Sports',
        videoGames=  'Video Games',
        fitness = 'Fitness',
        other =  'Other',
        technology = 'Technology',
        science =  'Science'
      }
    }

  ngOnInit() {
    this.mySkills = this.userInfo.mySkills;
    this.editText = 'Edit profile';
    this.skillEdit = false;
    this.aboutEdit = false;
    this.basicEdit = false;
    console.log(this.mySkills);
    if (this.userInfo.firstName.length > 0 ) {
      this.hasName = true;
    }
    if (this.userInfo.city.length > 0 ) {
      this.hasCity = true;
    }
  }
  edit(){
    this.skillEdit = true;
  }
  editBasicInfo() {
    if (!this.basicEdit){
      this.basicEdit = true;
      this.editText = 'Submit';
    } else {
      this.editText = 'callSubmitf';
    }
  }
  editBasicCancel() {
    this.basicEdit = false;
    this.editText = 'Edit profile';

  }
  editAbout() {
    this.newAbout = JSON.parse(JSON.stringify(this.userInfo.about));
    this.aboutEdit = true;
  }
  editAboutCancel() {
    this.aboutEdit = false;
    console.log(this.aboutEdit);
  }
  submitAbout() {
    console.log(this.userInfo);
    this.http.put(`${environment.apiUrl}/profile/about`, {about: this.newAbout, userId: this.userInfo._id}, {observe: 'response'}).
    subscribe(response => {

      // You can access status:
      if(response.status === 200){
        this.userInfo.about = this.newAbout.trim();
        this.authenticationService.setUserInfo(this.userInfo);
      }
      this.aboutEdit = false;
    });


  }

}
