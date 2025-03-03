import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentchatsComponent } from './recentchats.component';

describe('RecentchatsComponent', () => {
  let component: RecentchatsComponent;
  let fixture: ComponentFixture<RecentchatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentchatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentchatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
