import { Injectable } from '@angular/core';
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  IRemoteAudioTrack,
  UID
} from 'agora-rtc-sdk-ng';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgoraService {
  private readonly appId = '84f3b81e1dd0484ebd825ddf0ada1197';
  private token = null;

  client: IAgoraRTCClient;
  localAudioTrack: ILocalAudioTrack | undefined;
  remoteUsers: { [uid: UID]: IAgoraRTCRemoteUser } = {};
  remoteAudioTracks: { [uid: UID]: [IRemoteAudioTrack | undefined] } = {};
  channel: string | undefined;
  muted: boolean = false;

  private remoteUsersSubject = new Subject<{uid: number, state: 'joined' | 'left'}>();
  remoteUsersSubject$ = this.remoteUsersSubject.asObservable();

  constructor() {
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    this.client.on('user-joined', async (user) => {
      this.remoteUsers[user.uid] = user;
    });

    this.client.on('user-published', async (user, mediaType) => {
      await this.client.subscribe(user, mediaType);

      if (mediaType === 'audio') {
        user.audioTrack?.play();
        this.remoteAudioTracks[user.uid] = [user.audioTrack];
      } else if (mediaType === 'video') {
        // Handle video channel...
      }
    });

    this.client.on('user-unpublished', async (user, mediaType) => {
      await this.client.unsubscribe(user, mediaType);

      if (mediaType === 'audio') {
        user.audioTrack?.stop();
        delete this.remoteAudioTracks[user.uid];
      } else if (mediaType === 'video') {
        // Handle video channel...
      }
    });

    this.client.on('user-left', async (user) => {
      delete this.remoteUsers[user.uid];
    });
  }

  async join(
    channel: string,
    uid: string | number
  ) {
    await this.client.join(this.appId, channel, this.token, uid);

    this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    await this.localAudioTrack.setMuted(this.muted);

    await this.client.publish(this.localAudioTrack);
  }

  async leave() {
    if (this.localAudioTrack) {
      await this.client.unpublish(this.localAudioTrack);
    }

    this.localAudioTrack?.stop();
    this.localAudioTrack?.close();

    await this.client.leave();

    console.log(`Left ${this.channel}`);

    this.localAudioTrack = undefined;
    this.remoteUsers = {};
    this.remoteAudioTracks = {};
    this.channel = undefined;
    this.muted = false;
  }
}
