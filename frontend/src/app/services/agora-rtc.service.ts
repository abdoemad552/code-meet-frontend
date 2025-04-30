import { Injectable } from '@angular/core';
import AgoraRTC, {IAgoraRTCClient, IAgoraRTCRemoteUser, ILocalAudioTrack, UID} from 'agora-rtc-sdk-ng';
import {Subject} from 'rxjs';
import {AGORA_APP_ID} from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AgoraRtcService {

  private client: IAgoraRTCClient;
  private localAudioTrack: ILocalAudioTrack;
  private remoteUsers: { [uid: number]: IAgoraRTCRemoteUser } = {};
  isMuted: boolean = true;

  ///////////////////////////////////////////
  private volumeIndicator = new Subject<{ level: number, uid: UID }[]>();
  ///////////////////////////////////////////
  volumeIndicator$ = this.volumeIndicator.asObservable();
  ///////////////////////////////////////////

  constructor() {
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp9' });
    this.initEventListeners();
  }

  async join(channelName: string, token: string) {
    const uid = JSON.parse(sessionStorage.getItem("userInfo")).userId;
    await this.client.join(AGORA_APP_ID, channelName, token, uid);

    try {
      this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      await this.localAudioTrack.setMuted(this.isMuted);
      await this.client.publish([this.localAudioTrack]);
    } catch(error) {
      alert('RTC: Failed to obtain the microphone');
      console.log('RTC: Failed to obtain the microphone');
    }
  }

  async leave() {
    if (this.localAudioTrack) {
      this.localAudioTrack.stop();
      this.localAudioTrack.close();
      await this.client.unpublish([this.localAudioTrack]);
      this.localAudioTrack = null;
      console.log('RTC: Unpublished audio track');
    }
    await this.client.leave()
    console.log('Left the channel');
    this.remoteUsers = {};
    this.isMuted = true;
  }

  async toggleMuted() {
    this.isMuted = !this.isMuted;
    if (this.localAudioTrack) {
      await this.localAudioTrack.setMuted(this.isMuted);
    }
  }

  private initEventListeners() {
    this.client.on('user-joined', async (user) => {
      this.remoteUsers[user.uid] = user;
    });

    this.client.on('user-published', async (user, mediaType) => {
      await this.client.subscribe(user, mediaType);

      if (mediaType === 'audio') {
        if (user.audioTrack) {
          user.audioTrack.play();
        }
      } else if (mediaType === 'video') {
        // Handle video channel...
      }
    });

    this.client.on('user-unpublished', async (user, mediaType) => {
      await this.client.unsubscribe(user, mediaType);

      if (mediaType === 'audio') {
        if (user.audioTrack) {
          user.audioTrack.stop();
        }
      } else if (mediaType === 'video') {
        // Handle video channel...
      }
    });

    this.client.on('user-left', async (user) => {
      delete this.remoteUsers[user.uid];
    });

    this.client.on('volume-indicator', async volumes => {
      this.volumeIndicator.next(volumes);
    });
  }
}
