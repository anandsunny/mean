import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomValidators } from '../../shared/custom-validators';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FlashMessagesService } from 'angular2-flash-messages';


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
  profilePath: any;
  selectedProfile: File = null;

  constructor(
    private _formBuider: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _sentinization: DomSanitizer,
    private _flashMessageService: FlashMessagesService
  ) {
    this.createControls();
  }

  ngOnInit() {
    this.myForm.valueChanges.subscribe(_ => {
      this.logValidationErrors();
      console.log(this.myForm);
    }, err => console.log(err));
    this.myForm.get('uname').valueChanges.subscribe(data => {
      // console.log(this.myForm.get('uname'));
    })
  }

  validationMessages = {
    'uname': {
      'required': 'Username is required.',
      'minlength': 'Minimun 3 characters and Maximum 15 characters.',
      'maxlength': 'Minimun 3 characters and Maximum 15 characters.',
      'patternValidation': 'Username must be characters only.',
      'unameTaken': 'username already taken.'
    },
    'email': {
      'required': 'E-Mail is required.',
      'minlength': 'Minimun 5 characters and Maximum 30 characters.',
      'maxlength': 'Minimun 5 characters and Maximum 30 characters.',
      'patternValidation': 'Enter valid E-Mail.',
    },
    'pass': {
      'required': 'Password is required.',
      'minlength': 'Minimun 8 characters and Maximum 35 characters.',
      'maxlength': 'Minimun 8 characters and Maximum 35 characters.',
      'patternValidation': 'Must have at least one uppercase, lowercase, special character and number.'
    },
    'cpass': {
      'required': 'Confirm-Password is required.'
    },
    'passGroup': {
      'passMisMetched': 'Password and Confirm-Password do not match.'
    },
    'profile': {
      'required': 'Profile Photo is required.',
      'validateFile': 'Profile Photo must be an image'
    }
  };

  formErrors = {};

  // log fields errors dynamicaly
  logValidationErrors(group: FormGroup = this.myForm) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if ((abstractControl && !abstractControl.valid) && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];
        for (const errKey in abstractControl.errors) {

          if (errKey) {
            this.formErrors[key] += messages[errKey] + " ";
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  // on error image handling
  imgErrHandling(e) {
    e.target.src = "assets/person.png";
  }
  createControls() {
    this.myForm = this._formBuider.group({
      uname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        CustomValidators.patternValidation(/^[a-zA-Z0-9]+$/),
        CustomValidators.checkUname(this._authService)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        CustomValidators.patternValidation(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ])],
      passGroup: this._formBuider.group({
        pass: ['', Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(35),
          CustomValidators.patternValidation(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/)
        ])],
        cpass: ['', Validators.compose([
          Validators.required,
        ])]
      }, { validator: CustomValidators.passCompaire }),
      profile: ['', Validators.compose([
        Validators.required,
        CustomValidators.validateSingleInput(/(jpg|png|gif|bmp)$/i)])
      ]
    })
  }

  takeProfile(event) {
    this.selectedProfile = event.target.files[0];

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        this.profilePath = this._sentinization.bypassSecurityTrustUrl((<FileReader>e.target).result);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  checkEmail() {
    const email = this.myForm.get('email').value;
    if (email) {
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

  // //  check if username available
  // checkUsername(){
  //   // console.log(this.myForm.controls.uname.dirty, this.myForm.controls.uname.errors)
  //   const uname = this.myForm.get('uname').value;
  //   // console.log(uname);
  //   if(uname) {
  //     this._authService.checkUsername(uname).subscribe((data: any) => {
  //       console.log(data);
  //       this.isValidUname = false;
  //       this.isValidUnameClass = 'txt_success';
  //       this.isValidUnameMsg = data.message; 
  //     }, 
  //     (err: HttpErrorResponse) => {
  //       console.log(err.error.message)
  //       this.isValidUname = true;
  //       this.isValidUnameClass = 'txt_danger';
  //       this.isValidUnameMsg = err.error.message; 
  //     })
  //   }
  // }



  // save user data
  userSignUp() {
    this.processing = true;
    this.isDisabled();
    const fd: FormData = new FormData();
    fd.append('uname', this.myForm.get('uname').value);
    fd.append('email', this.myForm.get('email').value.toLowerCase());
    fd.append('pass', this.myForm.get('passGroup').value.pass);
    if(this.selectedProfile != null) {
      fd.append('profile', this.selectedProfile, this.selectedProfile.name);
    }
    this._authService.userRegistration(fd).subscribe((res:any) => {
      if(res.success) {
        this._flashMessageService.show(res.message, { cssClass: 'alert-success'});
        this.isEnabled();
        this.processing = false;

        setTimeout(() => {
          this._router.navigate(['login']);
        }, 1000);
        
      } else {
        this.isEnabled();
        this._flashMessageService.show('There are some problems. Registration Failed!', {cssClass: 'alert-danger'} );
        this.processing = false;
      }
    }, (err) => {
      this._flashMessageService.show(err.error.message, {cssClass: 'alert-danger'});
      this.isEnabled();
      this.processing = false;
    })
  }

  // disable form fields
  isDisabled() {
    this.myForm.get('uname').disable();
    this.myForm.get('email').disable();
    this.myForm.get('passGroup').disable();
    this.myForm.get('profile').disable();
  }

  // disable form fields
  isEnabled() {
    this.myForm.get('uname').enable();
    this.myForm.get('email').enable();
    this.myForm.get('passGroup').enable();
    this.myForm.get('profile').enable();
  }

}
