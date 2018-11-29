import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetBlogsService } from '../../../services/get-blogs.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  myForm: FormGroup;
  processing: Boolean = false;
  username: String;

  constructor(
    private _formBuilder: FormBuilder,
    private _blogService: GetBlogsService,
    private _flashMessagesService: FlashMessagesService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.createControls();
    this.username = JSON.parse(localStorage.getItem('user'));
  }

  // create form controls
  createControls() {
    this.myForm = this._formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidation
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])]
    })
  }

  // validation for title
  alphaNumericValidation(control) {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);

    if (regExp.test(control.value))
      return null;
    else
      return { 'alphaNumericValidation': true };
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
    this.processing = true;
    this.formDisable();
    
    const blog = {
      title: this.myForm.get('title').value,
      body: this.myForm.get('body').value,
      createdBy: this.username,
    }

    // funtion to save data into database
    this._blogService.newBlog(blog).subscribe((data: any) => {
        this._flashMessagesService.show(data.message, {cssClass: 'alert_success'});
        setTimeout(() => {
          this.processing = false;
          this.formEnable();
          this._router.navigate(['/blogs']);
        }, 2000);
    }, (err: HttpErrorResponse) => {
      this._flashMessagesService.show(err.error.message, {cssClass: 'alert_danger'});
      this.processing = false;
      this.formEnable();
    })
  }

}
