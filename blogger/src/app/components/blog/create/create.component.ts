import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BlogService } from '../../../services/blog.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from '../../../services/common.service';
import { IBlog } from '../../../interfaces/blog';
import { CustomValidators } from './../../../shared/custom-validators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  myForm: FormGroup;
  processing: boolean = false;
  username;
  clientImgPath: any;
  serverImgPath: string = '';
  fileExtErr: string;
  selectedFile: File = null;
  // blog: Blog = new Blog();
  blog: any;
  blogId: string;

  validationMessages = {
    'title': {
      'required': 'Title is required.',
      'minlength': 'Title must be greater than 2 characters.',
      'maxlength': 'Title must be less than 10 characters.',
      'alphaNumericValidation': 'Title must be charecters.'
    },
    'body': {
      'required': 'Blog Body is required.',
      'minlength': 'Max length 500, Min length 5',
      'maxlength': 'Max length 500, Min length 5'
    },
    'blogImg': {
      'required': 'Blog-Image is required.',
      'validateFile': 'Blog-Image must be an image'
    }
  };

  formErrors = {};

  constructor(
    private _formBuilder: FormBuilder,
    private _blogService: BlogService,
    private _flashMessagesService: FlashMessagesService,
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _authService: AuthService,
    private _commonService: CommonService

  ) { }

  ngOnInit() {
    this.createControls();
    this.username = JSON.parse(localStorage.getItem('user')).username;

    // validation fire on field value change
    this.myForm.valueChanges.subscribe(() => {
      this.logValidationErrors(this.myForm);
    });

    // get blog id to url
    this._actRoute.paramMap.subscribe((param: any) => {
      this.blogId = param.params.id;
      if (this.blogId) {
        this.getBlog(this.blogId);
      }
    })
  }


  // take image to input file
  takeImg(event) {
    this.selectedFile = event.target.files[0];
    this.serverImgPath = '';
    let imgControl = this.myForm.get('blogImg');
    imgControl.setValidators([Validators.required, CustomValidators.validateSingleInput(/(jpg|png|gif|bmp)$/i)]);
    imgControl.updateValueAndValidity();

    if( (event.target.files && event.target.files[0]) && (imgControl.valid) ) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        this.clientImgPath = (<FileReader>e.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // get blog by id
  getBlog(id) {
    this._blogService.blog(id).subscribe((blog: any) => {
      this.editBlog(blog.blog[0]);
    }, err => console.log(err));
  }

  // edit blog
  editBlog(blog: IBlog) {
    this.myForm.patchValue({
      title: blog.title,
      body: blog.body
    });
    
    this.serverImgPath = 'http://localhost:3000/img/' + blog.blogImg;
    if (!this.clientImgPath) {
      let imgControl = this.myForm.get('blogImg');
      imgControl.clearValidators();
      imgControl.updateValueAndValidity();
    }
  }

  // create form controls
  createControls() {
    this.myForm = this._formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        CustomValidators.alphaNumericValidation
      ]],
      body: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500)]
      ],
      blogImg: ['', [
        Validators.required,
        CustomValidators.validateSingleInput(/(jpg|png|gif|bmp)$/i)
      ]]
    })
  }


  // enable Form
  formEnable() {
    this.myForm.get('title').enable();
    this.myForm.get('body').enable();
  }

  // enable Form
  formDisable() {
    this.myForm.get('title').disable();
    this.myForm.get('body').disable();
  }

  saveBlog() {
    // this.formDisable();
    this.processing = true;
    const fd: FormData = new FormData();
    fd.append('title', this.myForm.get('title').value);
    fd.append('body', this.myForm.get('body').value);
    fd.append('createdBy', this.username);
    if (this.selectedFile != null) {
      fd.append('blogImg', this.selectedFile, this.selectedFile.name);
    }
    console.log(fd);
    // // blog edit
    // if (this.blogId) {
    //   this._blogService.edit(this.blogId, fd).subscribe((data: any) => {
    //     this.onSubmitCommon('Blog edited.');

    //   }, err => console.log(err));
    // } else {
    //   // create new blog
    //   this._blogService.newBlog(fd).subscribe((data: any) => {
    //     this.onSubmitCommon('New blog saved.');
    //   }, err => console.log(err));
    // }
  }

  onSubmitCommon(msg) {
    this._flashMessagesService.show(msg, { cssClass: 'alert_success' });
    this.processing = false;
    this.formEnable();
    this._router.navigate(['']);
  }

  // back button
  goBack() {
    this._router.navigate(['']);
  }


  // log validations
  logValidationErrors(group: FormGroup = this.myForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.dirty || abstractControl.touched)) {
        const message = this.validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += message[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }

    })
  }

}


