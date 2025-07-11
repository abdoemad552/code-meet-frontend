import { Injectable } from '@angular/core';
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack, ILocalVideoTrack
} from 'agora-rtc-sdk-ng';
import {Subject} from 'rxjs';
import {AGORA_APP_ID} from '../shared/environment';
import {AgoraTokenService} from './agora-token.service';

@Injectable({
  providedIn: 'root'
})
export class AgoraRtcService {
  private uid: string = '';
  private channelName: string;
  private client: IAgoraRTCClient;
  private localAudioTrack: ILocalAudioTrack;
  private localVideoTrack: ILocalVideoTrack;
  private micMuted: boolean = true;
  private camMuted: boolean = true;
  private remoteUsers = new Map<string, IAgoraRTCRemoteUser>();

  volumeLevel: { [userId: string]: number } = {};

  ///////////////////////////////////////////
  userPublished$ = new Subject<{ user: IAgoraRTCRemoteUser, mediaType: any }>();
  userUnpublished$ = new Subject<{ user: IAgoraRTCRemoteUser, mediaType: any }>();
  userJoined$ = new Subject<string>();
  userLeft$ = new Subject<string>();
  ///////////////////////////////////////////

  constructor(private tokenService: AgoraTokenService) {
    setInterval(() => {
      console.log(this.remoteUsers);
    }, 2000);
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp9' });
  }

  get audioTrack() {
    return this.localAudioTrack;
  }

  get videoTrack() {
    return this.localVideoTrack;
  }

  async join(channelName: string, uid: string) {
    this.channelName = channelName;
    this.uid = uid;

    this.initEventListeners();

    // Generating RTC token...
    const token = await this.tokenService.getRtcToken(channelName, uid);
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
      await this.localAudioTrack.setMuted(this.micMuted);
    } catch(error) {
      console.log('RTC: Failed to obtain the microphone');
    }

    try {
      this.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      await this.localVideoTrack.setMuted(this.camMuted);
    } catch(error) {
      console.log('RTC: Failed to obtain the camera');
    }
  }

  async toggleMicMuted() {
    if (this.localAudioTrack) {
      this.micMuted = !this.micMuted;
      await this.localAudioTrack.setMuted(this.micMuted);
    }
  }

  async toggleCamMuted() {
    if (this.localVideoTrack) {
      this.camMuted = !this.camMuted;
      await this.localVideoTrack.setMuted(this.camMuted);
      if (this.camMuted) {
        this.stopVideoTrack();
      } else {
        this.playVideoTrack();
      }
    }
  }

  playVideoTrack(uid: string = '') {
    if (!uid) uid = this.uid;

    if (this.isCamObtained(uid)) {
      const videoWrapper = document.createElement('video');
      videoWrapper.id = `video-wrapper-${uid}`;
      videoWrapper.className = 'w-full h-full object-cover rounded-xl';
      const container = document.getElementById(`video-container-${uid}`);
      console.log(container);
      if (container) {
        container.appendChild(videoWrapper);
        if (uid === this.uid) {
          this.localVideoTrack.play(videoWrapper);
        } else {
          this.remoteUsers.get(uid).videoTrack.play(videoWrapper);
        }
      } else {
        setTimeout(() => {
          this.playVideoTrack(uid);
        }, 200);
      }
    }
  }

  stopVideoTrack(uid: string = '') {
    if (!uid) uid = this.uid;

    console.log(`Stopping video track of ${uid}`);

    const videoWrapper = document.getElementById(`video-wrapper-${uid}`);
    console.log(videoWrapper);
    if (videoWrapper) {
      videoWrapper.remove();
    }
  }

  isMicObtained(uid: string = '') {
    if (!uid || uid === this.uid) {
      return !!this.localAudioTrack;
    } else {
      if (this.remoteUsers.get(uid)) {
        return this.remoteUsers.get(uid).hasAudio;
      } else {
        return false;
      }
    }
  }

  isCamObtained(uid: string = '') {
    if (!uid || uid === this.uid) {
      return !!this.localVideoTrack;
    } else {
      if (this.remoteUsers.get(uid)) {
        return this.remoteUsers.get(uid).hasVideo;
      } else {
        return false;
      }
    }
  }

  isMicMuted(uid: string = '') {
    if (!uid || uid === this.uid) {
      return this.isMicObtained() && this.micMuted;
    } else {
      return this.isMicObtained(uid);
    }
  }

  isCamMuted(uid: string = '') {
    if (!uid || uid === this.uid) {
      return this.isCamObtained() && this.camMuted;
    } else {
      return this.isCamObtained(uid);
    }
  }

  initEventListeners() {
    this.client.on('user-published', async (user, mediaType) => {
      await this.client.subscribe(user, mediaType);
      this.remoteUsers.set(String(user.uid), user);

      if (mediaType === 'audio') {
        if (user.audioTrack) {
          user.audioTrack.play();
        }
      } else {
        this.playVideoTrack(String(user.uid));
      }
    });

    this.client.on('user-unpublished', async (user, mediaType) => {
      await this.client.unsubscribe(user, mediaType);
      this.remoteUsers.set(String(user.uid), user);

      if (mediaType === 'audio') {
        if (user.audioTrack) {
          user.audioTrack.stop();
        }
      } else {
        this.stopVideoTrack(String(user.uid));
      }

      this.volumeLevel[user.uid] = 0;
    });

    this.client.on('user-joined', user => {
      this.remoteUsers.set(String(user.uid), user);
      this.userJoined$.next(String(user.uid));
    });

    this.client.on('user-left', user => {
      this.remoteUsers.delete(String(user.uid));
      this.userLeft$.next(String(user.uid));
    });

    this.client.on('token-privilege-did-expire', async () => {
      // Generating RTC token..
      const token = await this.tokenService.getRtcToken(this.channelName, this.uid);

      await this.client.join(AGORA_APP_ID, this.channelName, token, this.uid);
    });

    this.client.on('token-privilege-will-expire', async () => {
      // Generating RTC token..
      const token = await this.tokenService.getRtcToken(this.channelName, this.uid);

      await this.client.join(AGORA_APP_ID, this.channelName, token, this.uid);
    });

    (AgoraRTC as any).setParameter('AUDIO_VOLUME_INDICATION_INTERVAL', 200);
    this.client.enableAudioVolumeIndicator();
    this.client.on('volume-indicator', async volumes => {
      volumes.forEach(volume => this.volumeLevel[volume.uid] = volume.level);
    });

    this.client.on('exception', e => {
      console.error('RTC EXCEPTION:', e);
    });
  }

  async leave() {
    await this.removeAudioTrack();
    await this.removeVideoTrack();
    await this.client.leave();
    this.remoteUsers.clear();
    this.removeAllListeners();
    this.uid = ''
    this.channelName = null;
    console.log('RTC: Left the channel');
  }

  async removeAudioTrack() {
    if (this.localAudioTrack) {
      this.localAudioTrack.stop();
      this.localAudioTrack.close();
      try {
        await this.client.unpublish([this.localAudioTrack]);
      } catch (err) {
        console.error(err);
        if (err.code === 'INVALID_OPERATION') {
          console.log('RTC: Audio track is already not published')
        }
      }
      this.localAudioTrack = null;
      this.micMuted = true;
      console.log('RTC: Removed audio track');
    }
  }

  async removeVideoTrack() {
    if (this.localVideoTrack) {
      this.localVideoTrack.stop();
      this.localVideoTrack.close();
      try {
        await this.client.unpublish([this.localVideoTrack]);
      } catch (err) {
        console.error(err);
        if (err.code === 'INVALID_OPERATION') {
          console.log('RTC: Video track is already not published')
        }
      }
      this.localVideoTrack = null;
      this.camMuted = true;
      console.log('RTC: Removed video track');
    }
  }

  removeAllListeners() {
    this.client.removeAllListeners();
  }
}
