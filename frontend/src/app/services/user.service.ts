import {Injectable} from '@angular/core';
import {UserInfoResponse} from '../models/user/user-info-response.dto';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  userInfo! : UserInfoResponse;

  constructor() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo') || '');
  }
}
