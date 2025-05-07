import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NgIf} from '@angular/common';
import {AgoraRtcService} from '../../../services/agora-rtc.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-meeting-entrance',
  templateUrl: './meeting-entrance.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrl: './meeting-entrance.component.css'
})
export class MeetingEntranceComponent implements AfterViewInit {
  @Input() meetingId: string;
  @Output() join = new EventEmitter<string>();
  @ViewChild('videoTrackWrapper') videoTrackWrapper: ElementRef<HTMLVideoElement>;

  constructor(
    private route: ActivatedRoute,
    protected rtcService: AgoraRtcService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.meetingId = params.get('id');
    });
    this.rtcService.initEventListeners();
    this.rtcService.createMicrophoneAndVideoTracks();
  }

  get isMicObtained() {
    return this.rtcService.isMicObtained();
  }

  onJoin() {
    this.join.emit(this.meetingId);
  }

  onToggleMicEnabled() {
    this.rtcService.toggleMicMuted();
  }

  onToggleCamEnabled() {
    this.rtcService.toggleCamEnabled();
    if (this.rtcService.isCamObtained() && this.rtcService.isCamEnabled) {
      this.rtcService.videoTrack.play(this.videoTrackWrapper.nativeElement);
    } else {
      this.videoTrackWrapper.nativeElement.srcObject = null;
    }
  }

  onReturnHome() {

  }

  ngAfterViewInit() {
    if (this.rtcService.isCamObtained() && this.rtcService.isCamEnabled) {
      this.rtcService.videoTrack.play(this.videoTrackWrapper.nativeElement);
    }
  }

  get camButtonClasses(): string {
    if (!this.rtcService.isCamObtained()) {
      return 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60';
    }
    return this.rtcService.isCamEnabled
      ? 'bg-white text-gray-700 hover:bg-indigo-100 cursor-pointer'
      : 'bg-red-600 text-white hover:bg-red-700 cursor-pointer';
  }

  get micButtonClasses(): string {
    if (!this.rtcService.isMicObtained()) {
      return 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60';
    }
    return this.rtcService.isMicMuted
      ? 'bg-red-600 text-white hover:bg-red-700 cursor-pointer'
      : 'bg-white text-gray-700 hover:bg-indigo-100 cursor-pointer';
  }

  get camIconClass(): string {
    if (!this.rtcService.isCamObtained()) return 'text-gray-400';
    return this.rtcService.isCamEnabled ? 'text-indigo-600' : 'text-white';
  }

  get micIconClass(): string {
    if (!this.rtcService.isMicObtained()) return 'text-gray-400';
    return this.rtcService.isMicMuted ? 'text-white' : 'text-indigo-600';
  }
}
