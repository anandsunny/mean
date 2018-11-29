import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  msgClass: String;
  msg: String;
  notif: Boolean = false;
  processing: Boolean = false;

  isValidUname: Boolean = true;
  isValidUnameMsg: String;
  isValidUnameClass: String;

  isValidEmail: Boolean = true;
  isValidEmailMsg: String;
  isValidEmailClass: string;


  constructor(
    private _formBuider: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) { 
    this.createControls();
  }

  ngOnInit() {
  }

  // valid username format
  userNameFormat(control) {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if(regExp.test(control.value)) {
      return null;  //  Return as a valid username
    } else {
      return {'validateUsername': true} //  Return as a invalid username
    }
  }

  // valid email format
  emailFormat(control) {
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(regExp.test(control.value)) {
      return null;    //  Return as a valid email
    } else {
      return {'validateEmail': true};
    }
  }

  //  valid password format
  passwordFormat(control) {
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    if(regExp.test(control.value)) {
      return null;  //  Return as a valid password
    } else {
      return {'validatePassword': true};  //  Return as a invalid password
    }
  }

  // function to ensure password match
  matchingpassword(pass, cpass) {
    return (group: FormGroup) => {
      if(group.controls[pass].value === group.controls[cpass].value) {
        return null;  //  Return as a password matched
      } else {
        return {'matchingPasswords': true};   //  Return as a passwords did not match
      }
    }
  }

  createControls() {
    this.myForm = this._formBuider.group({
      uname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.userNameFormat
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.emailFormat
      ])],
      pass: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.passwordFormat
      ])],
      cpass: ['', Validators.compose([
        Validators.required,
      ])]
    },
    {validator: this.matchingpassword('pass', 'cpass')})
  }

  //  check if email available
  checkEmail(){
    const email = this.myForm.get('email').value;
    if(email) {
      this._authService.checkEmail(email).subscribe((data: any) => {
        this.isValidEmail = false;
        this.isValidEmailClass = 'txt_success';
        this.isValidEmailMsg = data.message;
      },
    (err: HttpErrorResponse) => {
      this.isValidEmail = true;
      this.isValidEmailClass = 'txt_danger';
      this.isValidEmailMsg = err.error.message;
    })
    }
  }

  //  check if username available
  checkUsername(){
    // console.log(this.myForm.controls.uname.dirty, this.myForm.controls.uname.errors)
    const uname = this.myForm.get('uname').value;
    // console.log(uname);
    if(uname) {
      this._authService.checkUsername(uname).subscribe((data: any) => {
        this.isValidUname = false;
        this.isValidUnameClass = 'txt_success';
        this.isValidUnameMsg = data.message; 
      }, 
      (err: HttpErrorResponse) => {
        this.isValidUname = true;
        this.isValidUnameClass = 'txt_danger';
        this.isValidUnameMsg = err.error.message; 
      })
    }
  }

  userSignUp(){
    this.notif = true;
    const user: User = {
      uname: this.myForm.get('uname').value,
      email: this.myForm.get('email').value,
      pass: this.myForm.get('pass').value
    };
    this._authService.userRegistration(user).subscribe((data: any) => {
      if(data.success) {
        this.msgClass = "alert_success";
        this.processing = true;
        this.isDisabled();
        setTimeout(() => {
          this._router.navigate(['/login']);
        }, 2000);
      } else {
        this.msgClass = "alert_danger";
        this.processing = false;
        this.isEnabled();
      }
      this.msg = data.message;
    })
  }

  // disable form fields
  isDisabled() {
    this.myForm.get('uname').disable();
    this.myForm.get('email').disable();
    this.myForm.get('pass').disable();
    this.myForm.get('cpass').disable();
  }

  // disable form fields
  isEnabled() {
    this.myForm.get('uname').enable();
    this.myForm.get('email').enable();
    this.myForm.get('pass').enable();
    this.myForm.get('cpass').enable();
  }

}
