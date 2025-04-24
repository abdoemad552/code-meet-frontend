import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingEntranceComponent } from './meeting-entrance.component';

describe('MeetingEntranceComponent', () => {
  let component: MeetingEntranceComponent;
  let fixture: ComponentFixture<MeetingEntranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingEntranceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingEntranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
