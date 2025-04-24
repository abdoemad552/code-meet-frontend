import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MeetingStateService} from '../../services/states/meeting-state.service';
import { Subscription } from 'rxjs';
import {NgIf} from '@angular/common';
import {MeetingEntranceComponent} from './meeting-entrance/meeting-entrance.component';
import {MeetingRoomComponent} from './meeting-room/meeting-room.component';

@Component({
  selector: 'app-meeting-container',
  imports: [NgIf, MeetingEntranceComponent, MeetingRoomComponent],
  templateUrl: './meeting-container.component.html',
  standalone: true,
  styleUrl: './meeting-container.component.css'
})

export class MeetingContainerComponent implements OnInit, OnDestroy {
  meetingId: string | null = null;
  currentView: 'entrance' | 'room' = 'entrance';
  private stateSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private meetingStateService: MeetingStateService
  ) {}

  ngOnInit(): void {
    // getting the meeting ID
    this.route.paramMap.subscribe(params => {
      this.meetingId = params.get('id');
      // further update is to: load meeting data here based on ID
    });

    // subscription to the state service to update the local view
    this.stateSubscription = this.meetingStateService.currentViewState$.subscribe(state => {
      this.currentView = state;
    });
  }

  // called by the MeetingEntranceComponent when 'Join' is clicked
  onJoinClicked(): void {
    this.meetingStateService.joinMeeting();
  }

  onLeaveClicked(): void {
    this.meetingStateService.resetState();
  }

  ngOnDestroy(): void {
    // cleaning up the subscription to prevent memory leaks
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }

    // reset the service state when leaving the route
    this.meetingStateService.resetState();
  }
}
