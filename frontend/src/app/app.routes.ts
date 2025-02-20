import { Routes } from '@angular/router';
import { EntryComponent } from './components/entry/entry.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
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
