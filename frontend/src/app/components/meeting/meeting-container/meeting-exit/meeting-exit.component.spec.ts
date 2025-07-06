import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingExitComponent } from './meeting-exit.component';

describe('MeetingExitComponent', () => {
  let component: MeetingExitComponent;
  let fixture: ComponentFixture<MeetingExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingExitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
