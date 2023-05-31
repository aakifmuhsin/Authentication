import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
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

  constructor(private service: AuthService,private route:Router,private formBuilder: FormBuilder,private cookieService: CookieService,private http: HttpClient,
    @Inject(DOCUMENT) private document: Document) {
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
      this.service.ProceedLogin(login.value).subscribe( (result) => {
        if(result!=null){
          this.responsedata=result;
          if (rememberMe) {
            localStorage.setItem('username', login.value.username);
            localStorage.setItem('password', login.value.password);
          } else
          {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
          }
          localStorage.setItem('token',this.responsedata.access_token)
          // decode the token to get user data  
          // const tokenData = JSON.parse(atob(this.responsedata.access_token.split('.')[1]));
          // localStorage.setItem('user', JSON.stringify(tokenData));
          const responseCookies = result.headers.getAll('Set-Cookie');
          // cookies.forEach((cookie) => {
          //   this.document.cookie = cookie;
          // });
          this.cookieService.set('cookieName', this.responsedata.access_token);
          const storedCookies = this.cookieService.get('cookieName');
          localStorage.setItem('cookies',storedCookies);
                                                                        
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
}
