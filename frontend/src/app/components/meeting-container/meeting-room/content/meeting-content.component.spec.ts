import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingContentComponent } from './meeting-content.component';

describe('ContentComponent', () => {
  let component: MeetingContentComponent;
  let fixture: ComponentFixture<MeetingContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
