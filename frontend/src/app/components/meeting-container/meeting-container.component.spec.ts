import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingContainerComponent } from './meeting-container.component';

describe('MeetingContainerComponent', () => {
  let component: MeetingContainerComponent;
  let fixture: ComponentFixture<MeetingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
