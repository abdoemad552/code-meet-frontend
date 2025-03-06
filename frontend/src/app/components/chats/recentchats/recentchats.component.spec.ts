import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentChatsComponent } from './recentchats.component';

describe('RecentchatsComponent', () => {
  let component: RecentChatsComponent;
  let fixture: ComponentFixture<RecentChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentChatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
