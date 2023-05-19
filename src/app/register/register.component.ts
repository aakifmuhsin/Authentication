import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService
  ) {}

  ngOnInit() {
    this.register = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      reg_no: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      phonenumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required]
    });
  }

  onRegister() {
    if (this.register.invalid) {
      return;
    }

    const customerData = this.register.value;
    this.service.SaveCustomer(customerData).subscribe(
      () => {
        // Registration successful
        alert('Registration successful');
        // Reset the form
        this.register.reset();
      },
      (error) => {
        // Registration failed
        alert('Registration failed: ' + error.error.detail);
        console.error('Registration failed', error);
      }
    );    
  }
}
