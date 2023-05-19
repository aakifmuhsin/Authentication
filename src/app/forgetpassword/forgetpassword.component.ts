import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {

  ResetPasswordForm: FormGroup;
  username: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.ResetPasswordForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  changePassword() {
    if (this.ResetPasswordForm.invalid) {
      return;
    }

    const username = this.ResetPasswordForm.get('username')?.value;
    const password = this.ResetPasswordForm.get('password')?.value;

    // Send PUT request to change the password
    const apiUrl = 'https://final-vy64.onrender.com/forget_password';
    const payload = { username, password };

    this.http.put(apiUrl, payload).subscribe(
      (response) => {
        alert('Registration Sucess: ' + response);
        console.log('Password changed successfully');
        // Perform any additional actions after successful password change
      },
      (error) => {
        alert('Registration failed: ' + error.error.detail);
        console.error('Error occurred while changing password:', error);
        // Handle error scenarios
      }
    );
  }

}
