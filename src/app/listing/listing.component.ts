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
  displayedColumns: string[] = [ 'username', 'phone_number', 'email', 'reg_no', 'address', 'gender', 'dob' ];
  paginationData: any[] = [];
  pageSizeOptions: number[] = [5, 10];
  currentPage: number = 1;
  pageSize = 5;
  totalItems = 0;
  totalPages = 100;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: CustomerService, private http:HttpClient ) { }

  ngOnInit(): void {
    this.LoadCustomer(this.currentPage);
  }
  
  LoadCustomer(page: number): void {
    this.http.get<any[]>(`https://final-vy64.onrender.com/student_list?page=${page}&page_size=${this.pageSize}`).subscribe(response => {
      this.customerdata = new MatTableDataSource<any>(response);
      this.customerdata.paginator = this.paginator;
      this.paginationData = response;
      this.totalItems = response.length;
      this.totalPages = Math.ceil(response.length / this.pageSize);
    });
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.LoadCustomer(this.currentPage);
    }
  }
  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.LoadCustomer(this.currentPage);
    }
  }
  
  // delete(ID: any): void {
  //   if (confirm("Do you want to remove?")) {
  //     this.service.RemoveCustomer(ID).subscribe(() => {
  //       this.LoadCustomer();
  //     });
  //   }
  // }
  onPageChange(event: PageEvent): void {
  this.currentPage = event.pageIndex + 1;
  this.LoadCustomer(this.currentPage);
}

}
