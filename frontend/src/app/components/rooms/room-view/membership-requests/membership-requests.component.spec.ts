import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipRequestsComponent } from './membership-requests.component';

describe('MembershipRequestComponent', () => {
  let component: MembershipRequestsComponent;
  let fixture: ComponentFixture<MembershipRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
