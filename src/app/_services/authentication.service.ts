import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";

import { environment } from '../../environments/environment';
import { User } from '../_models/User';
import { UserInfo } from '../_models/UserInfo';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    private currentUserInfoSubject: BehaviorSubject<UserInfo>;
    public currentUser: Observable<User>;
    public currentUserInfo: Observable<UserInfo>;
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentUserInfoSubject = new BehaviorSubject<UserInfo>(JSON.parse(localStorage.getItem('userInfo')));
        this.currentUserInfo = this.currentUserInfoSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/login`, { username, password })
            .pipe(map(user => {
                const tokenInfo = this.getDecodedAccessToken(user.token); // decode token
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                console.log('hello');
                localStorage.setItem('userInfo', JSON.stringify(tokenInfo));
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                this.currentUserInfoSubject.next(tokenInfo);
                return user;
            }));
    }
    getTokenExpirationDate(token: string): Date {
      const decoded = jwt_decode(token);

      if (decoded.exp === undefined) return null;

      const date = new Date(0);
      date.setUTCSeconds(decoded.exp);
      return date;
    }

    logout() {
        // delete user and token authentication from local storage
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userInfo');
        this.currentUserSubject.next(null);
    }
    getDecodedAccessToken(token: string): any {
      try {
          return jwt_decode(token);
      } catch(Error){
          return null;
      }
    }
    setUserInfo(info: UserInfo) {
      localStorage.setItem('userInfo', JSON.stringify(info));
      this.currentUserInfoSubject.next(info);
    }

}
