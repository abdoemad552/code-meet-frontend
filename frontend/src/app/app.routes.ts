import { Routes } from '@angular/router';
import { EntryComponent } from './components/entry/entry.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {AppComponent} from './app.component';
import {BoardComponent} from './components/appboard/board.component';
import {MeetingsComponent} from './components/meetings/meetings.component';
import {HomeComponent} from './components/home/home.component';

let signedIn: boolean = true;

const NotLoggedInRoutes: Routes = [
  {
    path: '',
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
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Page is not found'
  }
];

const LoggedInRoutes: Routes = [
  {
    path: '',
    component: BoardComponent,
    children: [
      {path: 'home', component: HomeComponent},
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Page is not found'
  }
];

export function getRoutes(isLoggedIn: boolean) : Routes {
  if (isLoggedIn)
    return LoggedInRoutes;
  return NotLoggedInRoutes;
}
