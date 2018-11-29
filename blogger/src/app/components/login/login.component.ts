import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  notif: Boolean = false;
  processing: Boolean = false;
  msgClass: String;
  msg: String;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { this.createControls(); }

  ngOnInit() {
    
  }

  createControls() {
    this.myForm = this._formBuilder.group({
      uname: ['', Validators.required],
      pass: ['', Validators.required]
    })
  }

  login() {
    this.notif = true;
    const user = {
      uname: this.myForm.get('uname').value,
      pass: this.myForm.get('pass').value
    };
    this._authService.userLogin(user).subscribe((data: any) => {
        this.disableForm();
        this.processing = true;
        this.msgClass = 'alert_success';
        this.msg = data.message;
        this._authService.storeUserData(data.token, data.user);
        setTimeout(() => {
          this._router.navigate(['/profile']);
        }, 2000);
    },
    (err: HttpErrorResponse) => {
      this.enableForm();
      this.processing = false;
      this.msgClass = 'alert_danger';
      this.msg = err.error.message;
    })
  }


  // disable form
  disableForm() {
    this.myForm.get('uname').disable();
    this.myForm.get('pass').disable();
  }

  // disable form
  enableForm() {
    this.myForm.get('uname').enable();
    this.myForm.get('pass').enable();
  }
}
