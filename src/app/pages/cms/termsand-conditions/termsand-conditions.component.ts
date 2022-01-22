import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';

@Component({
  selector: 'app-termsand-conditions',
  templateUrl: './termsand-conditions.component.html',
  styleUrls: ['./termsand-conditions.component.css']
})
export class TermsandConditionsComponent implements OnInit {

  dataLists: any = [];
  constructor(private http: HttpRequestService) {
    this.http.get('termsandconditions').subscribe(
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
