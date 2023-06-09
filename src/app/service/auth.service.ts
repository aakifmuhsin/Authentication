import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AES, enc, mode } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiurl='https://final-vy64.onrender.com/token';
  apiurll='https://final-vy64.onrender.com/register';
  apifrgt='https://final-vy64.onrender.com/forget_password'

  constructor(private http:HttpClient, private cookieService: CookieService) {}
  

  ProceedLogin( username: string, password: string){
    // const options = {
      
    //   observe: 'response'
    // };
    // const encryptedPassword = this.encryptData(password);
    const payload = {
      username: username,
      password: password
    };
    return this.http.post(this.apiurl, payload 
      // {withCredentials: true, observe: 'response' },
      )
    .pipe(
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

encryptionKey = '206c10c99d6246f784005331e384df6d13e2056b2d0037bef81de611efb62e03';

encryptData(password: string): string {
  const encrypted = AES.encrypt(password, enc.Hex.parse(this.encryptionKey), {
    mode: mode.ECB
  });
  return encrypted.toString();
}


decryptData(ciphertext: string): string {
  const decryptedText = AES.decrypt(ciphertext, this.encryptionKey).toString(enc.Utf8);
  return decryptedText;
}
}
