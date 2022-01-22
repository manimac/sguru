import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { StorageService } from 'src/app/services/storage/storage.service';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  userDetails: any = {};
  userDetailView: any = {};
  profileImage: any = '';
  imagePath: any = '';
  constructor(private storage: StorageService, public router: Router, private http: HttpRequestService) { 
    if(this.storage.getToken()){
      this.isLoggedIn = true;
      this.loadData();
    }
    if(this.storage.getUserDetails()){
      this.userDetails = this.storage.getUserDetails();
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        $(".menu").removeClass("active");
            $(".header-bar").removeClass("active");
            $('.overlay').removeClass('active');
      }
    });
  }

  loadData(){
    let userid = this.storage.getUserid();
    this.http.post('user/profileView', { filterSearch: userid }).subscribe(
      (response: any) => {
        if (response.data && Array.isArray(response.data) && (response.data.length > 0)) {
          this.userDetailView = response.data[0];
          this.profileImage = this.userDetailView.UserProfile ? this.userDetailView.UserProfile.image : ''
          this.imagePath = this.userDetailView.path ? this.userDetailView.path : '';
        }
      });
  }

  logout(){
    this.storage.setToken('');
    this.storage.setUserDetails('');
    this.router.navigateByUrl('/login');
  }

}
