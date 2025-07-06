import { Injectable } from '@angular/core';
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack, ILocalVideoTrack
} from 'agora-rtc-sdk-ng';
import {Subject} from 'rxjs';
import {AGORA_APP_ID} from '../shared/environment';
import {AgoraTokenService} from './agora-token.service';
import {AgoraRtmService} from './agora-rtm.service';
import {ParticipantInfoResponse} from '../models/meeting/participant-info-response.dto';

@Injectable({
  providedIn: 'root'
})
export class AgoraRtcService {
  private uid: string;
  private channelName: string;
  private client: IAgoraRTCClient;
  private localAudioTrack: ILocalAudioTrack;
  private localVideoTrack: ILocalVideoTrack;
  private remoteUsers = new Map<string, IAgoraRTCRemoteUser>();

  isMicMuted: boolean = true;
  isCamEnabled: boolean = false;
  volumeLevel: { [userId: string]: number } = {};

  ///////////////////////////////////////////
  userPublished$ = new Subject<{ user: IAgoraRTCRemoteUser, mediaType: any }>();
  userUnpublished$ = new Subject<{ user: IAgoraRTCRemoteUser, mediaType: any }>();
  ///////////////////////////////////////////

  constructor(
    private rtmService: AgoraRtmService,
    private tokenService: AgoraTokenService
  ) {
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
      await this.localAudioTrack.setMuted(this.isMicMuted);
    } catch(error) {
      console.log('RTC: Failed to obtain the microphone');
    }

    try {
      this.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
        encoderConfig: {
          width: 144,
          height: 100,
          frameRate: 10,
          bitrateMin: 200,
          bitrateMax: 500,
        }
      });
      await this.localVideoTrack.setEnabled(this.isCamEnabled);
    } catch(error) {
      console.log('RTC: Failed to obtain the camera');
    }
  }

  async toggleMicMuted() {
    if (this.localAudioTrack) {
      this.isMicMuted = !this.isMicMuted;
      await this.localAudioTrack.setMuted(this.isMicMuted);
      this.rtmService.sendMessage(JSON.stringify({
        type: 'MIC_TOGGLED',
        info: {
          isMicMuted: this.isMicMuted
        }
      }));
    }
  }

  async toggleCamEnabled() {
    if (this.localVideoTrack) {
      this.isCamEnabled = !this.isCamEnabled;
      await this.localVideoTrack.setEnabled(this.isCamEnabled);
      this.rtmService.sendMessage(JSON.stringify({
        type: 'CAM_TOGGLED',
        info: {
          isCamEnabled: this.isCamEnabled
        }
      }));
    }
  }

  playVideoTrack(participantId: string) {
    if (this.isCamObtained(participantId)) {
      const elementId = `video-wrapper-${participantId}`;
      const element = document.getElementById(elementId) as HTMLVideoElement;
      if (element && !element.srcObject) {
        if (participantId === this.uid) {
          this.localVideoTrack.play(element);
        } else {
          this.remoteUsers.get(participantId).videoTrack.play(element);
        }
      }
    }
  }

  isMicObtained(participantId: string = null) {
    if (participantId === null || participantId === this.uid) {
      return !!this.localAudioTrack;
    } else {
      if (this.remoteUsers.get(participantId)) {
        return !!this.remoteUsers.get(participantId).audioTrack;
      } else {
        return false;
      }
    }
  }

  isCamObtained(participantId: string = null) {
    if (participantId === null || participantId === this.uid) {
      return !!this.localVideoTrack;
    } else {
      if (this.remoteUsers.get(participantId)) {
        return !!this.remoteUsers.get(participantId).videoTrack;
      } else {
        return false;
      }
    }
  }

  _isMicMuted(participant: ParticipantInfoResponse) {
    if (participant.participantId === this.uid) {
      return this.isMicMuted;
    } else {
      return participant.isMicMuted;
    }
  }

  _isCamEnabled(participant: ParticipantInfoResponse) {
    if (participant.participantId === this.uid) {
      return this.isCamEnabled;
    } else {
      return participant.isCamEnabled;
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
      }
    });

    this.client.on('user-unpublished', async (user, mediaType) => {
      await this.client.unsubscribe(user, mediaType);
      this.remoteUsers.set(String(user.uid), user);

      if (mediaType === 'audio') {
        if (user.audioTrack) {
          user.audioTrack.stop();
        }
      }

      this.volumeLevel[user.uid] = 0;
    });

    this.client.on('user-joined', user => {
      this.remoteUsers.set(String(user.uid), user);
    });

    this.client.on('user-left', user => {
      this.remoteUsers.delete(String(user.uid));
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
    this.removeAllListeners();
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
      this.isMicMuted = true;
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
      this.isCamEnabled = false;
      console.log('RTC: Removed video track');
    }
  }

  removeAllListeners() {
    this.client.removeAllListeners();
  }
}
