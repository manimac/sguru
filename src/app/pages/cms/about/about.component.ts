import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  dataLists: any = [];
  constructor(private http: HttpRequestService) {
    this.http.get('about').subscribe(
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
