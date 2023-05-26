import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  customerdata!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'username', 'phone_number', 'email', 'reg_no', 'address', 'gender', 'dob'];

  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize = 5;
  pageIndex = 0;
  totalItems = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: CustomerService, private http:HttpClient ) { }

  ngOnInit(): void {
    this.LoadCustomer();
  }

  LoadCustomer(): void {
    this.http.get<any[]>("https://final-vy64.onrender.com/student_list").subscribe(data => {
      this.customerdata = new MatTableDataSource<any>(data);
      this.customerdata.paginator = this.paginator;
      this.totalItems = data.length;
    });
  }

  // delete(ID: any): void {
  //   if (confirm("Do you want to remove?")) {
  //     this.service.RemoveCustomer(ID).subscribe(() => {
  //       this.LoadCustomer();
  //     });
  //   }
  // }
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
}
