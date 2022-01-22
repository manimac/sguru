import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';

@Component({
  selector: 'app-refund-policy',
  templateUrl: './refund-policy.component.html',
  styleUrls: ['./refund-policy.component.css']
})
export class RefundPolicyComponent implements OnInit {

  dataLists: any = [];
  constructor(private http: HttpRequestService) {
    this.http.get('refundpolicy').subscribe(
      (response: any) => {
        this.dataLists = response;
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
   }

  ngOnInit(): void {
  }

  

}
