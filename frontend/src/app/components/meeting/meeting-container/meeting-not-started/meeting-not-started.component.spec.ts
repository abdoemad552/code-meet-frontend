import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingNotStartedComponent } from './meeting-not-started.component';

describe('MeetingNotStartedComponent', () => {
  let component: MeetingNotStartedComponent;
  let fixture: ComponentFixture<MeetingNotStartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingNotStartedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingNotStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
