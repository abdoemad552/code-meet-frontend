import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgoraTokenService {

  private readonly url = 'http://localhost:8080/api/agora';

  async getRtcToken(channelName: string, uid: string, tokenExpire: number = 3600, privilegeExpire: number = 3600) {
    return fetch(`${this.url}/rtc-token?uid=${uid}&channelName=${channelName}&tokenExpire=${tokenExpire}&privilegeExpire=${privilegeExpire}`)
      .then(response => response.text());
  }

  async getRtmToken(channelName: string, uid: string, tokenExpire: number = 3600) {
    return fetch(`${this.url}/rtm-token?uid=${uid}&channelName=${channelName}&tokenExpire=${tokenExpire}`)
      .then(response => response.text());
  }
}
