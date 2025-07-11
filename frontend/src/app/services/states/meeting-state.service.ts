import {Injectable} from '@angular/core';
import {BehaviorSubject, filter, Subject, Subscription, takeUntil} from 'rxjs';
import {MeetingView} from '../../models/meeting/state/meeting-view';
import {MeetingInfoResponse} from '../../models/meeting/meeting-info-response.dto';
import {ParticipantInfoResponse} from '../../models/meeting/participant-info-response.dto';
import {MeetingService} from '../meeting.service';
import {AgoraRtcService} from '../agora-rtc.service';
import {AgoraRtmService} from '../agora-rtm.service';
import {formatDateTime} from '../../shared/utils';
import {ChatMessage} from '../../models/meeting/state/meeting-message';
import {WebSocketService} from '../websocket.service';
import {getOwner} from '../../shared/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingStateService {
  participation: ParticipantInfoResponse = null;
  participants: ParticipantInfoResponse[] = [];
  messages: ChatMessage[] = [];

  private meetingSubject = new BehaviorSubject<MeetingInfoResponse>(null);
  private currentViewSubject = new BehaviorSubject<MeetingView>(null);
  private requestJoinSubject = new Subject<number>();
  private codeSubject = new BehaviorSubject<string>('');

  private subs: Subscription[] = [];

  meeting$ = this.meetingSubject.asObservable();
  currentView$ = this.currentViewSubject.asObservable();
  requestJoin$ = this.requestJoinSubject.asObservable();
  code$ = this.codeSubject.asObservable();

  constructor(
    private meetingService: MeetingService,
    private rtcService: AgoraRtcService,
    private rtmService: AgoraRtmService,
    private wsService: WebSocketService
  ) {
  }

  get meeting() {
    return this.meetingSubject.value;
  }

  get currentView() {
    return this.currentViewSubject.value;
  }

  get sortedParticipants() {
    return this.participants.sort((a, b) => {
      return a.user.firstName < b.user.firstName ? -1 :
        a.user.firstName > b.user.firstName ? 1 :
          a.user.lastName < b.user.lastName ? -1 :
            a.user.lastName > b.user.lastName ? 1 :
              a.user.username.toLowerCase().localeCompare(b.user.username.toLowerCase());
    });
  }

  get code() {
    return this.codeSubject.value;
  }

  setMeeting(meeting: MeetingInfoResponse) {
    this.meetingSubject.next(meeting);
  }

  setCurrentView(view: MeetingView) {
    this.currentViewSubject.next(view);
  }

  setParticipation(participation: ParticipantInfoResponse) {
    this.participation = participation;
  }

  setParticipants(participants: ParticipantInfoResponse[]) {
    this.participants = participants;
  }

  addParticipant(participant: ParticipantInfoResponse) {
    this.participants.push(participant);
  }

  removeParticipant(participant: ParticipantInfoResponse) {
    this.participants.filter(
      p => p.participantId !== participant.participantId
    );
  }

  setMessages(messages: ChatMessage[]) {
    this.messages = messages;
  }

  saveMessage(message: ChatMessage) {
    this.messages.push(message);
  }

  setCode(code: string) {
    this.codeSubject.next(code);
  }

  async syncCode(code: string = null) {
    if (code) {
      this.rtmService.setAttributes({
        code: code
      });
    } else {
      const syncedCode = await this.rtmService.getAttribute("code");
      this.codeSubject.next(syncedCode.value || '');
    }
  }

  acceptJoin() {
    const acceptJoinSubject = new Subject<ParticipantInfoResponse>();
    this.wsService.connection$
      .pipe(
        filter(isConnected => {
          if (!isConnected) {
            acceptJoinSubject.error('WS is disconnected');
          }
          return isConnected;
        })
      )
      .subscribe({
        next: isConnected => {
          console.log('WS is connected:', isConnected);
          const topic = `/accept-join/${getOwner().userId}/${this.meeting.meetingId}`;
          this.wsService.subscribe(topic)
            .pipe(takeUntil(acceptJoinSubject))
            .subscribe({
              next: message => {
                acceptJoinSubject.next(JSON.parse(message.body));
                acceptJoinSubject.complete();
                this.wsService.unsubscribe(topic);
              },
              error: err => console.error(err)
            });
        },
        error: err => console.error(err)
      });
    return acceptJoinSubject.asObservable();
  }

  requestJoin() {
  }

  acceptEditor() {
  }

  requestEditor() {
  }

  isSpeaking(participantId: string): boolean {
    return this.rtcService.volumeLevel[participantId] >= 50;
  }

  initMeetingRoom() {
    this.initEventListeners();
  }

  leaveMeetingRoom() {
    this.rtcService.leave();
    this.rtmService.leave();
    this.setParticipation(null);
    this.setMessages([]);
    this.setParticipants([]);
    this.subs.forEach(sub => sub.unsubscribe());
    this.subs = [];
  }

  private initEventListeners() {
    this.subs.push(this.rtcService.userJoined$
      .subscribe({
        next: participantId => {
          console.log(`RTM: ${participantId} joined the channel`);
          this.meetingService.getParticipant(participantId)
            .subscribe({
              next: participant => {
                console.log(participant);
                this.addParticipant(participant);
                console.log(`User joined: ${participant}`);
              },
              error: err => console.error(err)
            });
        }
      }));
    this.subs.push(this.rtcService.userLeft$
      .subscribe({
        next: participantId => {
          console.log(`RTM: ${participantId} left the channel`);
          this.meetingService.getParticipant(participantId)
            .subscribe({
              next: participant => {
                console.log(participant);
                this.removeParticipant(participant);
              },
              error: err => console.error(err)
            });
        }
      }));
    this.subs.push(this.rtmService.channelMessage$
      .subscribe({
        next: rtmMessage => {
          console.log(`RTM: A new message ${rtmMessage.content} from ${rtmMessage.memberId} at ${rtmMessage.ts}`);
          const index = this.participants.findIndex(p => p.participantId === rtmMessage.memberId);
          const content = rtmMessage.content;
          switch (content.type) {
            case 'CHAT_MESSAGE':
              const message = {
                sender: {
                  id: this.participants[index].participantId,
                  firstName: this.participants[index].user.firstName,
                  lastName: this.participants[index].user.lastName,
                  username: this.participants[index].user.username
                },
                content: content.text,
                sentAt: formatDateTime(new Date(rtmMessage.ts).toISOString())
              }
              this.saveMessage(message);
              break;
            case 'CODE_CHANGE':
              this.setCode(content.code);
              break;
            default:
              throw new Error('Illegal message type');
          }
        }
      }));
  }
}
