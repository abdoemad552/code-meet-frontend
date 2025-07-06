import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingSidebarComponent } from './meeting-sidebar.component';

describe('SidebarComponent', () => {
  let component: MeetingSidebarComponent;
  let fixture: ComponentFixture<MeetingSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
