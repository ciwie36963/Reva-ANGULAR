import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'm-profile',
	templateUrl: './profile.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }
  get name():String {
     return this.authService.user$.getValue().name;
   }
   get email() {
    
    return this.authService.user$.getValue().email;
   }
}
