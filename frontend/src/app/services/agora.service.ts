import { Injectable } from '@angular/core';
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  IRemoteAudioTrack,
  UID
} from 'agora-rtc-sdk-ng';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgoraService {
  private readonly appId = 'c0b890b72f994661bdecd75416e2e795';
  private token = null;

  client: IAgoraRTCClient;
  localAudioTrack: ILocalAudioTrack | undefined;
  remoteUsers: { [uid: UID]: IAgoraRTCRemoteUser } = {};
  remoteAudioTracks: { [uid: UID]: [IRemoteAudioTrack | undefined] } = {};
  channel: string | undefined;
  isMuted: boolean = true;

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
    await this.localAudioTrack.setMuted(this.isMuted);

    await this.client.publish(this.localAudioTrack);
  }

  async leave() {
    if (this.localAudioTrack) {
      await this.client.unpublish(this.localAudioTrack);
    }

    this.localAudioTrack?.stop();
    this.localAudioTrack?.close();

    await this.client.leave();

    this.localAudioTrack = undefined;
    this.remoteUsers = {};
    this.remoteAudioTracks = {};
    this.channel = undefined;
    this.isMuted = true;
  }

  async toggleMuted() {
    this.isMuted = !this.isMuted;
    if (this.localAudioTrack) {
      await this.localAudioTrack.setMuted(this.isMuted);
    }
  }
}
