import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  userDetails: any = {};
  imagePath: any = '';
  profileImage: any = '';
  userProfileLink: any = {};
  currentProfileId: any;
  currentUserId: any;
  constructor(private http: HttpRequestService, private storage: StorageService, private route: ActivatedRoute) {
    this.currentUserId = this.storage.getUserid();
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (params.profile) {
          this.currentProfileId = params.profile;
          this.loadProfile();
          this.loadProfileLink();
        }
      }
      );
  }

  loadProfile() {
    this.http.post('user/profileView', { filterSearch: this.currentProfileId }).subscribe(
      (response: any) => {
        if (response.data && Array.isArray(response.data) && (response.data.length > 0)) {
          this.userDetails = response.data[0];
          this.profileImage = this.userDetails.UserProfile ? this.userDetails.UserProfile.image : '';
          let email: any = '';
          if (this.userDetails.email == 'yyyyyy@gmail.com' || this.userDetails.email == 'yyyyyy@gmail.com') {
            email = '';
          }
          else {
            email = this.userDetails.email;
          }
          this.imagePath = this.userDetails.path ? this.userDetails.path : '';
        }
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
  }

  loadProfileLink() {
    this.http.post('userprofilelink', { userid: this.currentUserId, profileid: this.currentProfileId }).subscribe(
      (response: any) => {
        if (response && Array.isArray(response) && (response.length > 0)) {
          this.userProfileLink = response[0];
        }
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

  setProfileLink(status: any) {
    let url = (this.userProfileLink.id) ? "userprofilelink/update" : "userprofilelink/create";
    let updatestatus: any = '';
    let params: any = { userid: this.currentUserId, profileid: this.currentProfileId, status: updatestatus };
    if (this.userProfileLink.id) {
      if (this.userProfileLink.status == status) {
        updatestatus = '';
      }
      else {
        updatestatus = status;
      }
      params['status'] = updatestatus;
      params['id'] = this.userProfileLink.id;
    }
    this.http.post(url, params).subscribe(
      (response: any) => {
        this.loadProfileLink();
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
  }

}
