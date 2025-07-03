import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingBoxComponent } from './meeting-box.component';

describe('MeetingBoxComponent', () => {
  let component: MeetingBoxComponent;
  let fixture: ComponentFixture<MeetingBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
