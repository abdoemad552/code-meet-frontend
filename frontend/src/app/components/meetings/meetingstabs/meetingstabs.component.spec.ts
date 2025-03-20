import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsTabsComponent } from './meetingstabs.component';

describe('MeetingsTabsComponent', () => {
  let component: MeetingsTabsComponent;
  let fixture: ComponentFixture<MeetingsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingsTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
