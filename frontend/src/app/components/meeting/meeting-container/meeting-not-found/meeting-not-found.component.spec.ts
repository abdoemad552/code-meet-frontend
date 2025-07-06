import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingNotFoundComponent } from './meeting-not-found.component';

describe('MeetingNotFoundComponent', () => {
  let component: MeetingNotFoundComponent;
  let fixture: ComponentFixture<MeetingNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingNotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
