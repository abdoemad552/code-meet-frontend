import { Injectable } from '@angular/core';
import AgoraRTM, {RtmChannel, RtmClient} from 'agora-rtm-sdk';
import {Subject} from 'rxjs';
import {AGORA_APP_ID} from '../shared/environment';
import {AgoraTokenService} from './agora-token.service';

@Injectable({
  providedIn: 'root'
})
export class AgoraRtmService {
  uid: string;
  channelName: string;
  private client: RtmClient;
  private channel: RtmChannel;

  //////////////////////////////////////////////////////////
  channelMessage$ = new Subject<{ content: any, memberId: string, ts: number }>();
  memberJoined$ = new Subject<string>();
  memberLeft$ = new Subject<string>();
  //////////////////////////////////////////////////////////

  constructor(private tokenService: AgoraTokenService) {
    this.client = AgoraRTM.createInstance(AGORA_APP_ID);
  }

  async join(channelName: string, uid: string) {
    this.uid = uid;
    this.channelName = channelName;

    this.initClientEventListeners();

    // Generating RTM token...
    const token = await this.tokenService.getRtmToken(channelName, uid);
    await this.client.login({ uid: uid, token: token });

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
    if (this.channel) {
      this.channel.sendMessage({ text: message });
    }
  }

  doSomething() {
    this.client.setChannelAttributes(this.channelName, {

    });
  }

  initClientEventListeners() {
    this.client.on('TokenExpired', async () => {
      // Generating RTM token...
      const token = await this.tokenService.getRtmToken(this.channelName, this.uid);
      this.client.renewToken(token);
    });

    this.client.on('TokenPrivilegeWillExpire', async () => {
      // Generating RTM token...
      const token = await this.tokenService.getRtmToken(this.channelName, this.uid);
      this.client.renewToken(token);
    });
  }

  initChannelEventListeners() {
    this.channel.on('ChannelMessage', async (message, memberId, props) => {
      this.channelMessage$.next({
        content: JSON.parse(message.text),
        memberId: memberId,
        ts: props.serverReceivedTs
      });
    });

    this.channel.on('MemberJoined', async memberId => {
      this.memberJoined$.next(memberId);
    });

    this.channel.on('MemberLeft', async memberId => {
      this.memberLeft$.next(memberId);
    });
  }
}

