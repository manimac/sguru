import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {

  dataLists: any = [];
  constructor(private http: HttpRequestService) {
    this.http.get('privacypolicy').subscribe(
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
