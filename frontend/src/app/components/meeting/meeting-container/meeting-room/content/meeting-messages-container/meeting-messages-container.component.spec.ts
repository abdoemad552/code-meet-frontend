import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingMessagesContainerComponent } from './meeting-messages-container.component';

describe('MeetingMessagesContainerComponent', () => {
  let component: MeetingMessagesContainerComponent;
  let fixture: ComponentFixture<MeetingMessagesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingMessagesContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingMessagesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
