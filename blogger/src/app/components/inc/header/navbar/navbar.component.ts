import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  routControl: Boolean;

  constructor(
    private _authService: AuthService,
    private _flashMessagesServices: FlashMessagesService,
    private _router: Router
  ) { }

  ngOnInit() {
    //  console.log(this._flashMessagesServices);
  }

  logout() {
    this._authService.userLogout();
    this._flashMessagesServices.show('You are logged out.', { cssClass: 'alert_success', timeout: 2000 });
    this._router.navigate(['/']);
  }

}
