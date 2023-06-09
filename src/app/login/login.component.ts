import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  messageclass = '';
  message = '';
  Customerid: any;
  editdata: any;
  responsedata: any;
  UserCred: any;
  rememberedUsername: string = '';
  rememberedPassword: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;  
  password: string = '';
  encodedPassword: string = '';

  constructor(private service: AuthService,private route:Router,private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document: Document) {
  }
  decodePassword(): void {
    this.encodedPassword = this.Todecode();
  }
  ngOnInit(): void {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if(storedUsername && storedPassword){
      this.loginForm = this.formBuilder.group({
        username: [storedUsername, [Validators.required, Validators.min(8)]],
        password: [storedPassword, Validators.required]
      });
    }
    else{
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.min(8)]],
      password: ['', Validators.required]
    });
  }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  ProceedLogin(login: any, rememberMe: boolean) {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      // Simulate an asynchronous action
      setTimeout(() => {
        // Perform your password change logic here
  
        // After the action is complete, set isLoading back to false
        this.isLoading = false;
      }, 6000);
      const username = this.loginForm.value.username;
      const password = this.service.encryptData(this.loginForm.value.password);
      this.service.ProceedLogin( username, password).subscribe( (result) => {
       if(result!=null){
          this.responsedata=result;
          if (rememberMe) {
            localStorage.setItem('dsd', username);
            localStorage.setItem('dsa', password);
          } else
          {
            localStorage.removeItem('dsd');
            localStorage.removeItem('dsa');
          }
          localStorage.setItem('token',this.responsedata.access_token)                                                         
          this.route.navigate(['/home'])
        }
      },
      (error) => {
        alert('Invalid Username and Password');
      })
    }
    else {
      this.errorMessage = 'Failed to Retrieve Data. '
    }
  }
  Todecode(): any{
  }
}
