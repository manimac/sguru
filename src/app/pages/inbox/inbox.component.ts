import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  dataLists: any = []
  casteLists: any = []
  constructor(private storage: StorageService, private http: HttpRequestService) { }

  ngOnInit(): void {
    this.http.get('caste').subscribe(
      (response: any) => {
        this.casteLists = response;
        this.loadProfiles('all');
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )    
  }

  loadProfiles(type: any) {    
    let userid = this.storage.getUserid();
    if (type == 'favourite' || type == 'notinterested') {
      this.storage.addLoader.emit();
      this.http.post('userprofilelinkgetByUser', { userid: userid, status: type }).subscribe(
        (response: any) => {
          this.storage.removeLoader.emit();
          let profileIds: any = [];
          if (response && Array.isArray(response) && (response.length > 0)) {
            response.forEach(element => {
              profileIds.push(element.profileid);
            })
            let params: any = {
              id: this.storage.getUserid(),
              type: type,
              profileIds: profileIds
            };
            this.http.post('user/profileView', { filterSearch: userid }).subscribe(
              (response: any) => {
                if (response.data && Array.isArray(response.data) && (response.data.length > 0)) {
                  let userDetails = response.data[0].UserProfile;
                  params['gender'] = userDetails.gender;
                  this.getHomePageUsers(params);
                }
              });
          }
          else {
            this.dataLists = [];
          }
        });
    }
    else {
      this.http.post('user/profileView', { filterSearch: userid }).subscribe(
        (response: any) => {
          if (response.data && Array.isArray(response.data) && (response.data.length > 0)) {
            let userDetails = response.data[0].UserProfile;
            if (userDetails) {
              let params: any = {
                id: this.storage.getUserid(),
                type: type
              };
              if (type == 'all') {
                params['languageid'] = userDetails.languageid;
              }
              else if (type == 'mymatches') {
                let currentCaste = this.casteLists.find((element: any)=>(element.id==userDetails.preferencecasteid));
                let casteIds: any = [];
                if(currentCaste){
                  this.casteLists.forEach((element: any) => {
                    if(element.code == currentCaste.code){
                      casteIds.push(currentCaste.id)
                    }
                  });
                }
                else{
                  casteIds = [userDetails.preferencecasteid];
                }
                params['preferencereligionid'] = userDetails.preferencereligionid;
                params['preferencecasteid'] = casteIds;
                params['preferencelanguageid'] = userDetails.preferencelanguageid;
                params['preferencefoodHabit'] = userDetails.preferencefoodHabit;
              }
              params['gender'] = userDetails.gender;
              this.getHomePageUsers(params);
            }
          }
        });
    }
  }

  getHomePageUsers(params: any) {
    this.storage.addLoader.emit();
    this.http.post('homePageUsers', params).subscribe(
      (response: any) => {
        this.dataLists = response.data;
        this.storage.removeLoader.emit();
      },
      (error: any) => {
        this.http.exceptionHandling(error);
        this.storage.removeLoader.emit(); 
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
    return age + " yrs";
  }

}
