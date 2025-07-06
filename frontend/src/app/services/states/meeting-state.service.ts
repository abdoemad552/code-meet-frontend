import {Injectable} from '@angular/core';
import {BehaviorSubject, filter, Subject, take, takeUntil} from 'rxjs';
import {MeetingView} from '../../models/meeting/state/meeting-view';
import {MeetingInfoResponse} from '../../models/meeting/meeting-info-response.dto';
import {ParticipantInfoResponse} from '../../models/meeting/participant-info-response.dto';
import {MeetingService} from '../meeting.service';
import {AgoraRtcService} from '../agora-rtc.service';
import {AgoraRtmService} from '../agora-rtm.service';
import {formatDateTime} from '../../shared/utils';
import {UserInfoResponse} from '../../models/user/user-info-response.dto';
import {ChatMessage} from '../../models/meeting/state/meeting-message';
import {WebSocketService} from '../websocket.service';

@Injectable({
  providedIn: 'root'
})
export class MeetingStateService {

  owner: UserInfoResponse;
  private meetingSubject = new BehaviorSubject<MeetingInfoResponse>(null);
  private currentViewSubject = new BehaviorSubject<MeetingView>(null);
  private participationSubject = new BehaviorSubject<ParticipantInfoResponse>(null);
  private participantsSubject = new BehaviorSubject<ParticipantInfoResponse[]>(null);
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  private requestJoinSubject = new Subject<number>();

  meeting$ = this.meetingSubject.asObservable();
  currentView$ = this.currentViewSubject.asObservable();
  participation$ = this.participationSubject.asObservable();
  participants$ = this.participantsSubject.asObservable();
  messages$ = this.messagesSubject.asObservable();
  requestJoin$ = this.requestJoinSubject.asObservable();

  constructor(
    private meetingService: MeetingService,
    private rtcService: AgoraRtcService,
    private rtmService: AgoraRtmService,
    private wsService: WebSocketService
  ) {
    this.owner = JSON.parse(sessionStorage.getItem("userInfo"));
  }

  get meeting() {
    return this.meetingSubject.value;
  }

  get currentView() {
    return this.currentViewSubject.value;
  }

  get participation() {
    return this.participationSubject.value;
  }

  get participants() {
    return this.participantsSubject.value;
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

  get messages() {
    return this.messagesSubject.value;
  }

  setMeeting(meeting: MeetingInfoResponse) {
    this.meetingSubject.next(meeting);
  }

  setCurrentView(view: MeetingView) {
    this.currentViewSubject.next(view);
  }

  setParticipation(participation: ParticipantInfoResponse) {
    this.participationSubject.next(participation);
  }

  setParticipants(participants: ParticipantInfoResponse[]) {
    this.participantsSubject.next(participants);
  }

  addParticipant(participant: ParticipantInfoResponse) {
    this.setParticipants([
      ...this.participants,
      participant
    ]);
  }

  removeParticipant(participant: ParticipantInfoResponse) {
    this.setParticipants(this.participantsSubject.value.filter(
      p => p.participantId !== participant.participantId
    ));
  }

  setMessages(messages: ChatMessage[]) {
    this.messagesSubject.next(messages);
  }

  saveMessage(message: ChatMessage) {
    this.setMessages([
      ...this.messages,
      message
    ]);
  }

  acceptJoin() {
    const acceptJoinSubject = new Subject<ParticipantInfoResponse>();
    this.wsService.connection$
      .pipe(
        take(1),
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
          const topic = `/accept-join/${this.owner.userId}/${this.meeting.meetingId}`;
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
    this.getAllParticipants();
  }

  leaveMeetingRoom() {
    this.rtcService.leave();
    this.rtmService.leave();
    this.setParticipation(null);
    this.setMessages([]);
    this.setParticipants(null);
  }

  private getAllParticipants() {
    this.rtmService.getChannelMembers()
      .then(membersIds => {
        this.meetingService.getAllParticipants(membersIds)
          .subscribe({
            next: participants => {
              setTimeout(() => {
                console.log(participants);
                this.participantsSubject.next(participants);
                this.initEventListeners();
              }, 2000);
            },
            error: err => console.error(err)
          });
      })
      .catch(err => console.error(err));
  }

  private initEventListeners() {
    this.rtmService.memberJoined$
      .subscribe({
        next: memberId => {
          console.log(`RTM: ${memberId} joined the channel`);
          this.meetingService.getParticipant(memberId)
            .subscribe({
              next: participant => {
                console.log(participant);
                this.addParticipant(participant);
              },
              error: err => console.error(err)
            });
        }
      });
    this.rtmService.memberLeft$
      .subscribe({
        next: memberId => {
          console.log(`RTM: ${memberId} left the channel`);
          this.meetingService.getParticipant(memberId)
            .subscribe({
              next: participant => {
                console.log(participant);
                this.removeParticipant(participant);
              },
              error: err => console.error(err)
            });
        }
      });
    this.rtmService.channelMessage$
      .subscribe({
        next: rtmMessage => {
          console.log(`RTM: A new message ${rtmMessage.content} from ${rtmMessage.memberId} at ${rtmMessage.ts}`);
          const index = this.participants.findIndex(p => p.participantId === rtmMessage.memberId);
          const content = rtmMessage.content;
          switch (content.type) {
            case 'MIC_TOGGLED':
              this.participants[index].isMicMuted = content.info.isMicMuted;
              break;
            case 'CAM_TOGGLED':
              this.participants[index].isCamEnabled = content.info.isCamEnabled;
              break;
            case 'CHAT_MESSAGE':
              const message = {
                sender: {
                  id: this.participants[index].participantId,
                  firstName: this.participants[index].user.firstName,
                  lastName: this.participants[index].user.lastName,
                  username: this.participants[index].user.username
                },
                content: content.info.text,
                sentAt: formatDateTime(new Date(rtmMessage.ts).toISOString())
              }
              this.saveMessage(message);
              break;
            default:
              throw new Error('Illegal message type');
          }
        }
      });
  }
}
