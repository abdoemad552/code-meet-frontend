import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsboxComponent } from './meetingsbox.component';

describe('MeetingsboxComponent', () => {
  let component: MeetingsboxComponent;
  let fixture: ComponentFixture<MeetingsboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingsboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingsboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
