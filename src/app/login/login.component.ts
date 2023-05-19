import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  messageclass = ''
  message = ''
  Customerid: any;
  editdata: any;
  responsedata: any;
  UserCred: any;
  rememberedUsername: string = '';
  rememberedPassword: string = '';
  errorMessage: string = '';
  

  constructor(private service: AuthService,private route:Router,private formBuilder: FormBuilder) {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{8}$/)]],
      password: ['', Validators.required]
    });
  }
  ProceedLogin(login: any, rememberMe: boolean) {
    if (this.loginForm.valid) {
      this.service.ProceedLogin(login.value).subscribe(result => {
        if(result!=null){
          this.responsedata=result;
          localStorage.setItem('token',this.responsedata.access_token)
          // decode the token to get user data  
          const tokenData = JSON.parse(atob(this.responsedata.access_token.split('.')[1]));
          if (rememberMe) {
            localStorage.setItem('username', login.value.username);
            localStorage.setItem('password', login.value.password);
          } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
          }
          localStorage.setItem('user', JSON.stringify(tokenData));
          this.route.navigate([''])
        }
        else {
        alert('Registration failed: ');
        console.error('Registration failed');
          
        }
      }),
      (error: { error: { detail: string; }; }) => {
        // Registration failed
        alert('Registration failed: ' + error.error.detail);
        console.error('Registration failed', error);
      };
    }
    else {
      this.errorMessage = 'Failed to Retrieve Data.'
    }
  }
  forgotPassword() {
    // const username = this.Login.get('username')?.value;
    // let foundUser = null;
    // let userId = null;
  
    // if (username !== -1) {
    //   // Retrieve the list of users from the API
    //   this.service.forgetPass(username.value).subscribe(
    //     (result: any) => {
    //       if (result && result.length > 0) {
    //         // Search for the user with the exact name or email
    //         foundUser = result.find((user: { email: any }) => user.email === username);
  
    //         // Check if a user was found
    //         if (foundUser) {
    //           userId = foundUser.id;
    //           console.log(userId);
    //           // Store the userId value in the sessionStorage
    //           sessionStorage.setItem('userId', userId);
              this.route.navigate(['/forgot-password']);
  //           } else {
  //             alert('You are not a user. Please sign up');
  //           }
  //         } else {
  //           alert('Failed to retrieve the user list');
  //         }
  //       },
  //       (error) => {
  //         alert('An error occurred while retrieving the user list');
  //       }
  //     );
  //   } else {
  //     alert('Please provide an email');
  //   }
  }
  
  
}
