import { Injectable } from '@angular/core';
import AgoraRTM, {RtmChannel, RtmClient} from 'agora-rtm-sdk';
import {Subject} from 'rxjs';
import {AGORA_APP_ID} from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AgoraRtmService {

  private client: RtmClient;
  private channel: RtmChannel;

  //////////////////////////////////////////////////////////
  tokenExpired$ = new Subject<void>();
  privilegeTokenWillExpire$ = new Subject<void>();
  channelMessage$ = new Subject<{ content: string, memberId: string, ts: number }>();
  memberJoined$ = new Subject<string>();
  memberLeft$ = new Subject<string>();
  //////////////////////////////////////////////////////////

  constructor() {
    this.client = AgoraRTM.createInstance(AGORA_APP_ID);
  }

  async join(channelName: string, token: string) {
    this.initClientEventListeners();

    const uid = JSON.parse(sessionStorage.getItem("userInfo")).userId;
    await this.client.login({ uid: uid.toString(), token: token });

    this.channel = this.client.createChannel(channelName);
    this.initChannelEventListeners();
    await this.channel.join();

    console.log(`RTM: You joined channel ${channelName}`);
  }

  async leave() {
    await this.channel.leave();
    await this.client.logout();
    console.log('RTM: You left channel');
    this.channel.removeAllListeners();
    this.client.removeAllListeners();
    this.channel = null;
  }

  async getChannelMembers() {
    return await this.channel.getMembers();
  }

  sendMessage(message: string) {
    this.channel.sendMessage({ text: message });
  }

  async renewToken(token: string) {
    await this.client.renewToken(token);
    console.log('RTM: RTM token renewed');
  }

  initClientEventListeners() {
    this.client.on('TokenExpired', async () => {
      this.tokenExpired$.next();
    });

    this.client.on('TokenPrivilegeWillExpire', async () => {
      this.privilegeTokenWillExpire$.next();
    });
  }

  initChannelEventListeners() {
    this.channel.on('ChannelMessage', async (message, memberId, props) => {
      this.channelMessage$.next({ content: message.text, memberId: memberId, ts: props.serverReceivedTs });
    });

    this.channel.on('MemberJoined', async memberId => {
      this.memberJoined$.next(memberId);
    });

    this.channel.on('MemberLeft', async memberId => {
      this.memberLeft$.next(memberId);
    });
  }
}

