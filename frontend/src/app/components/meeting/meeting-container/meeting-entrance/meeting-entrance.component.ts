import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {AgoraRtcService} from '../../../../services/agora-rtc.service';
import {MeetingService} from '../../../../services/meeting.service';
import {HttpStatusCode} from '@angular/common/http';
import {MeetingStateService} from '../../../../services/states/meeting-state.service';
import {Router} from '@angular/router';
import {AgoraRtmService} from '../../../../services/agora-rtm.service';
import {MeetingView} from '../../../../models/meeting/state/meeting-view';
import {getOwner} from '../../../../shared/environment';

@Component({
  selector: 'app-meeting-entrance',
  templateUrl: './meeting-entrance.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  styleUrl: './meeting-entrance.component.css'
})
export class MeetingEntranceComponent {
  @Output() join = new EventEmitter<void>();
  @ViewChild('copyButton', { static: false }) copyButton: ElementRef;

  copyTimeout: any;
  isParticipant: boolean = null;
  isRequesting: boolean = false;

  constructor(
    private router: Router,
    private meetingService: MeetingService,
    protected rtcService: AgoraRtcService,
    protected rtmService: AgoraRtmService,
    protected state: MeetingStateService
  ) {
  }

  ngOnInit() {
    this.rtcService.createMicrophoneAndVideoTracks();

    this.meetingService.getParticipantOfMeeting(
      getOwner().userId,
      this.state.meeting.meetingId
    ).subscribe({
      next: participant => {
        setTimeout(() => {
          this.state.setParticipation(participant);
          this.isParticipant = true;
        }, 1000);
      },
      error: err => {
        console.error(err);
        if (err.status === HttpStatusCode.NotFound) {
          // Not a participant. Listen to acceptance...
          this.isParticipant = false;
          this.listenToAcceptJoin();
        } else if (err.status === HttpStatusCode.BadRequest) {
          // TODO: Handle private meeting...
        }
      }
    });
  }

  async onJoin() {
    if (this.isParticipant) {
      this.state.setParticipants([this.state.participation]);
      this.state.initMeetingRoom();
      await this.rtcService.join(
        this.state.meeting.meetingId,
        this.state.participation.participantId
      );
      await this.rtmService.join(
        this.state.meeting.meetingId,
        this.state.participation.participantId
      );
      this.state.setCurrentView(MeetingView.ROOM);
    } else {
      this.requestJoin();
    }
  }

  requestJoin() {
    this.isRequesting = true;
    this.meetingService.requestJoin({
      userId: getOwner().userId,
      meetingId: this.state.meeting.meetingId
    }).subscribe({
      next: response => {
        // Request sent successfully.
        // Now, waiting for acceptance.
        console.log(response);
      },
      error: err => {
        console.error(err);
        this.isRequesting = false;
        // TODO: Show error message...
      }
    });
  }

  listenToAcceptJoin() {
    this.state.acceptJoin()
      .subscribe({
        next: participant => {
          console.log(participant);
          this.state.setParticipation(participant);
          this.isParticipant = true;
          this.isRequesting = false;
        },
        error: err => {
          // TODO: Handle the error (mostly ws is not working), so try again...
          console.log(err);
        }
      });
  }

  onReturnHome() {
    this.router.navigateByUrl('/home');
  }

  onToggleMicMuted() {
    this.rtcService.toggleMicMuted();
  }

  onToggleCamMuted() {
    this.rtcService.toggleCamMuted();
  }

  onCopyUUID() {
    navigator.clipboard.writeText(this.state.meeting.meetingId);
    this.copyButton.nativeElement.innerHTML = 'Copied!';
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }
    this.copyTimeout = setTimeout(() => {
      this.copyButton.nativeElement.innerHTML = 'Copy'
    }, 500);
  }

  ngOnDestroy() {
    console.log('DESTROY:', this.state.currentView);
    if (this.state.currentView === MeetingView.ENTRANCE) {
      this.clean();
    }
  }

  clean() {
    this.rtcService.removeAllListeners();
    this.rtcService.removeAudioTrack();
    this.rtcService.removeVideoTrack();
    this.state.setParticipation(null);
  }

  get camButtonClasses(): string {
    if (!this.rtcService.isCamObtained()) {
      return 'bg-gray-300 text-gray-400 cursor-not-allowed opacity-60';
    }
    return !this.rtcService.isCamMuted()
      ? 'bg-white text-gray-700 hover:bg-indigo-100 active:bg-indigo-200 cursor-pointer'
      : 'bg-red-500 text-white hover:bg-red-700 active:bg-red-800 cursor-pointer';
  }

  get micButtonClasses(): string {
    if (!this.rtcService.isMicObtained()) {
      return 'bg-gray-300 text-gray-400 cursor-not-allowed opacity-60';
    }
    return this.rtcService.isMicMuted()
      ? 'bg-red-500 text-white hover:bg-red-700 active:bg-red-800 cursor-pointer'
      : 'bg-white text-gray-700 hover:bg-indigo-100 active:bg-indigo-200 cursor-pointer';
  }

  get camIconClass(): string {
    if (!this.rtcService.isCamObtained()) return 'text-gray-400';
    return !this.rtcService.isCamMuted() ? 'text-indigo-600' : 'text-white';
  }

  get micIconClass(): string {
    if (!this.rtcService.isMicObtained()) return 'text-gray-400';
    return this.rtcService.isMicMuted() ? 'text-white' : 'text-indigo-600';
  }
}
