// meeting-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

type MeetingViewState = 'entrance' | 'room';

@Injectable({
  providedIn: 'root'
})
export class MeetingStateService {
  private _currentViewState = new BehaviorSubject<MeetingViewState>('entrance');
  currentViewState$: Observable<MeetingViewState> = this._currentViewState.asObservable();

  // transition to the meeting room view
  joinMeeting(): void {
    this._currentViewState.next('room');
  }

  // reset the state, e.g., when leaving the meeting
  resetState(): void {
    this._currentViewState.next('entrance');
  }
}
