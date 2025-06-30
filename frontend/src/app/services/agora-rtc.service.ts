import { Injectable } from '@angular/core';
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack, ILocalVideoTrack
} from 'agora-rtc-sdk-ng';
import {BehaviorSubject, Subject} from 'rxjs';
import {AGORA_APP_ID} from '../shared/environment';

@Injectable({
  providedIn: 'root'
})
export class AgoraRtcService {

  private client: IAgoraRTCClient;
  private remoteUsers: { [uid: number]: IAgoraRTCRemoteUser } = {};
  private localAudioTrack: ILocalAudioTrack;
  private localVideoTrack: ILocalVideoTrack;
  isMicMuted: boolean = true;
  isCamEnabled: boolean = false;

  ///////////////////////////////////////////
  volumeIndicator$ = new Subject<{ level: number, uid: any }[]>();
  userPublished$ = new Subject<{ user: IAgoraRTCRemoteUser, mediaType: any }>();
  userUnpublished$ = new Subject<{ user: IAgoraRTCRemoteUser, mediaType: any }>();
  camObtained$ = new BehaviorSubject<boolean>(false);
  ///////////////////////////////////////////

  constructor() {
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp9' });
  }

  get audioTrack() {
    return this.localAudioTrack;
  }

  get videoTrack() {
    return this.localVideoTrack;
  }

  async join(channelName: string, token: string) {
    const uid = JSON.parse(sessionStorage.getItem("userInfo")).userId;
    await this.client.join(AGORA_APP_ID, channelName, token, uid);

    if (this.localAudioTrack) {
      await this.client.publish([this.localAudioTrack]);
    }
    if (this.localVideoTrack) {
      try {
        await this.client.publish([this.localVideoTrack]);
      } catch (error) {
        if (error.code !== 'TRACK_IS_DISABLED') {
          console.log(error);
        }
      }
    }
  }

  async createMicrophoneAndVideoTracks() {
    try {
      this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      await this.localAudioTrack.setMuted(this.isMicMuted);
    } catch(error) {
      console.log('RTC: Failed to obtain the microphone');
    }

    try {
      this.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      this.camObtained$.next(true);
      await this.localVideoTrack.setEnabled(this.isCamEnabled);
    } catch(error) {
      console.log('RTC: Failed to obtain the camera');
    }
  }

  async leave() {
    if (this.localAudioTrack) {
      this.localAudioTrack.stop();
      this.localAudioTrack.close();
      await this.client.unpublish([this.localAudioTrack]);
      this.localAudioTrack = null;
      this.isMicMuted = true;
      console.log('RTC: Unpublished audio track');
    }
    if (this.localVideoTrack) {
      this.localVideoTrack.stop();
      this.localVideoTrack.close();
      await this.client.unpublish([this.localVideoTrack]);
      this.localVideoTrack = null;
      this.isCamEnabled = false;
      console.log('RTC: Unpublished video track');
    }
    await this.client.leave();
    console.log('RTC: Left the channel');
    this.client.removeAllListeners();
    this.remoteUsers = {};
  }

  async toggleMicMuted() {
    if (this.localAudioTrack) {
      this.isMicMuted = !this.isMicMuted;
      await this.localAudioTrack.setMuted(this.isMicMuted);
    }
  }

  async toggleCamEnabled() {
    if (this.localVideoTrack) {
      this.isCamEnabled = !this.isCamEnabled;
      await this.localVideoTrack.setEnabled(this.isCamEnabled);
    }
  }

  isMicObtained() {
    return !!this.localAudioTrack;
  }

  isCamObtained() {
    return !!this.localVideoTrack;
  }

  initEventListeners() {
    this.client.on('user-joined', async (user) => {
      this.remoteUsers[user.uid] = user;
    });

    this.client.on('user-left', async (user) => {
      delete this.remoteUsers[user.uid];
    });

    this.client.on('user-published', async (user, mediaType) => {
      await this.client.subscribe(user, mediaType);

      if (mediaType === 'audio') {
        if (user.audioTrack) {
          user.audioTrack.play();
        }
      } else if (mediaType === 'video') {
        if (user.videoTrack) {
          user.videoTrack.play(`video-wrapper-${user.uid}`);
        }
      }
    });

    this.client.on('user-unpublished', async (user, mediaType) => {
      await this.client.unsubscribe(user, mediaType);

      if (mediaType === 'audio') {
        if (user.audioTrack) {
          user.audioTrack.stop();
        }
      } else if (mediaType === 'video') {
        if (user.videoTrack) {
          user.videoTrack.stop();
        }
      }

      this.volumeIndicator$.next([{ level: 0, uid: user.uid }]);
    });

    (AgoraRTC as any).setParameter('AUDIO_VOLUME_INDICATION_INTERVAL', 200);
    this.client.enableAudioVolumeIndicator();
    this.client.on('volume-indicator', async volumes => {
      this.volumeIndicator$.next(volumes);
    });
  }
}
