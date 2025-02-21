import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PhoneInputComponent } from './phone-input/phone-input.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, PhoneInputComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

}
