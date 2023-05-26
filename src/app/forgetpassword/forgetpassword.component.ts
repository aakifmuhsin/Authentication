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
  isLoading: boolean = false;
  showPassword: boolean = false;  


  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.ResetPasswordForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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
     // Set isLoading to true to show the loading state
     this.isLoading = true;

     // Simulate an asynchronous action
     setTimeout(() => {
       // Perform your password change logic here
 
       // After the action is complete, set isLoading back to false
       this.isLoading = false;
     }, 2000);
    this.http.put(apiUrl, payload).subscribe(
      (response) => {
        alert('Password changed successfully');
        // Perform any additional actions after successful password change
      },
      (error) => {
        alert('Error occurred while changing password:');
        // Handle error scenarios
      }
    );
  }

}
