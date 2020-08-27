import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './confirm-password.validator';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }
    dataList = [];
    submitId = 0;
    validateInputs() {
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        password: ['', [Validators.required]],
        confirmPassword: ['', Validators.required],
        id: ['']
    }, {
      validator: ConfirmPasswordValidator('password', 'confirmPassword')

    });
    }
  ngOnInit() {
    this.validateInputs();
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
     
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      if (!this.registerForm.value.id) {
        this.registerForm.value.id = new Date().getTime();
        this.dataList.push(this.registerForm.value);
      } else {
        for (let data of this.dataList) {
          if (data.id === this.registerForm.value.id) {
            data.firstName = this.registerForm.value.firstName
            data.lastName = this.registerForm.value.lastName
            data.password = this.registerForm.value.password
            data.confirmPassword = this.registerForm.value.confirmPassword
          }
        }
      }
      this.registerForm.reset();
      this.submitted = false;
  }

  editMethod(data) {
    Object.keys(this.registerForm.controls).forEach(key => {
      this.registerForm.controls[key].setValue(data[key]);
    });
    this.registerForm.value.id = data.id;
  }
}


