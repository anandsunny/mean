import { Component, OnInit } from '@angular/core';
import { AuthService } from  './../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  uname: String;
  email: String;
  
  constructor(
    private _authService: AuthService,
    private _routerStateSnapshot: ActivatedRoute
  ) { }

  ngOnInit() {
    this._authService.getProfile().subscribe((data: any) => {
      this.uname = data.user.uname;
      this.email = data.user.email;
    })
  }

}
