import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiurl='https://final-vy64.onrender.com/token';
  apiurll='https://final-vy64.onrender.com/register';
  apifrgt='https://final-vy64.onrender.com/forget_password'

  constructor(private http:HttpClient) {}

  ProceedLogin(UserCred:any){
    return this.http.post(this.apiurl,UserCred).pipe(
      catchError(() => {
        return throwError('Error getting token from API.');
      })
    );
  }
  forgetPass(customerData: any) {
    return this.http.put(this.apifrgt, customerData);
  }
  IsLoggedIn(){
    return localStorage.getItem('token')!=null;
  }
  SaveCustomer(customedata:any){
    return this.http.post(this.apiurll,customedata);
   }
  GetToken(){
    return localStorage.getItem('token')||'';
  }

  HaveAccess(){
    var loggintoken=localStorage.getItem('token')||'';
    var _extractedtoken=loggintoken.split('.')[1];
    var _atobdata=atob(_extractedtoken);
    var _finaldata=JSON.parse(_atobdata);
    if(_finaldata.role=='string'){
      return true
    }else{
      alert('you not having access');
      return false
    }
  }
}
