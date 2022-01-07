import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  dataLists: any = []
  constructor(private storage: StorageService, private http: HttpRequestService) { }

  ngOnInit(): void {
    this.loadProfiles();
  }

  loadProfiles(){
    let params: any = {
      id: this.storage.getUserid()
    }
    this.http.post('homePageUsers', params).subscribe(
      (response: any) => {
        this.dataLists = response.data;
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
  }

  getAge(dateString: any) {
    if (!dateString) {
      return 'Not Mentioned';
    }
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

}
