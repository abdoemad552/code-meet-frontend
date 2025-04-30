import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AgoraTokenService {

  private readonly url = 'http://localhost:8080/api/agora';

  constructor() { }

  async getRtcToken(channelName: string, tokenExpire: number = 3600, privilegeExpire: number = 3600) {
    const uid = JSON.parse(sessionStorage.getItem("userInfo")).userId;
    return fetch(`${this.url}/rtc-token?uid=${uid}&channelName=${channelName}&tokenExpire=${tokenExpire}&privilegeExpire=${privilegeExpire}`)
      .then(response => response.json());
  }

  async getRtmToken(channelName: string, tokenExpire: number = 3600) {
    const uid = JSON.parse(sessionStorage.getItem("userInfo")).userId;
    return fetch(`${this.url}/rtm-token?uid=${uid}&channelName=${channelName}&tokenExpire=${tokenExpire}`)
      .then(response => response.json());
  }
}
