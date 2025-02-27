import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingstabsComponent } from './meetingstabs.component';

describe('MeetingstabsComponent', () => {
  let component: MeetingstabsComponent;
  let fixture: ComponentFixture<MeetingstabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingstabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingstabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
