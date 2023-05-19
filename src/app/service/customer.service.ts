import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
apiurl='https://final-vy64.onrender.com/student_list';
apiurll='https://final-vy64.onrender.com/register';
  constructor(private http:HttpClient) {}

   LoadCustomer(){
     return this.http.get(this.apiurl);
   }
   SaveCustomer(customedata:any){
    return this.http.post(this.apiurll,customedata);
   }
   LoadCustomerbycode(id:any){
    return this.http.get(this.apiurl+'/'+id);
  }
  RemoveCustomer(id:any){
    return this.http.delete(this.apiurl+'/'+id);
  }

}
