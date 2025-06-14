import { Routes } from '@angular/router';
import { EntryComponent } from './components/entry/entry.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {BoardComponent} from './components/appboard/board.component';
import {MeetingsComponent} from './components/meetings/meetings.component';
import {HomeComponent} from './components/home/home.component';
import {FriendsComponent} from './components/friends/friends.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileEditComponent} from './components/profile/profile-edit/profile-edit.component';
import {RoomsComponent} from './components/rooms/rooms.component';
import {ChatsComponent} from './components/chats/chats.component';
import {ChatboxComponent} from './components/chats/chatbox/chatbox.component';
import {FriendRequestsComponent} from './components/friends/friend-requests/friend-requests.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {AuthGuard} from './services/guards/auth.guard';
import {MeetingContainerComponent} from './components/meeting-container/meeting-container.component';
import {MeetingCreationComponent} from './components/meeting-container/meeting-creation/meeting-creation.component';
import {RoomViewComponent} from './components/rooms/room-view/room-view.component';

export const routes: Routes = [
  // Public Routes
  {
    path: 'entry',
    component: EntryComponent,
    title: 'Code Meet'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login to your account - Code Meet'
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Sign up a new account'
  },

  // Protected Routes at the root path
  {
    path: '',
    component: BoardComponent,
    canActivate: [AuthGuard],  // Only authenticated users can access these
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home Page'
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        title: 'Notifications'
      },
      {
        path: 'profile/:username',
        component: ProfileComponent,
        title: 'Profile',
        children: [
          {
            path: 'edit',
            component: ProfileEditComponent,
            title: 'Edit profile'
          }
        ]
      },
      {
        path: 'meetings',
        component: MeetingsComponent,
        title: 'Meetings'
      },
      {
        path: 'rooms',
        component: RoomsComponent,
        title: 'Rooms'
      },
      {
        path: 'room/:id',
        component: RoomViewComponent
      },
      {
        path: 'friends',
        component: FriendsComponent,
        title: 'Friends'
      },
      {
        path: 'chats',
        component: ChatsComponent,
        title: 'My Personal Chats',
        data: { isChatPage: true },
        children: [
          {
            path: ':id',
            component: ChatboxComponent
          }
        ]
      },
      {
        path: 'meeting/:id',
        component: MeetingContainerComponent
      },
      {
        path: 'meeting',
        component: MeetingCreationComponent
      }
    ]
  },
  // Fallback route for undefined paths
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Page is not found'
  }
];


// export function getRoutes(isLoggedIn: boolean) : Routes {
//   if (isLoggedIn)
//     return LoggedInRoutes;
//   return NotLoggedInRoutes;
// }
