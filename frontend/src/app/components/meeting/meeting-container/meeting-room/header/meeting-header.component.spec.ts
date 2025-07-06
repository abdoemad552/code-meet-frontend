import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingHeaderComponent } from './meeting-header.component';

describe('HeaderComponent', () => {
  let component: MeetingHeaderComponent;
  let fixture: ComponentFixture<MeetingHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
