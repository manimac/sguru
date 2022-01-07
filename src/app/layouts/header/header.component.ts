import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  userDetails: any = {};
  constructor(private storage: StorageService, public router: Router) { 
    if(this.storage.getToken()){
      this.isLoggedIn = true;
    }
    if(this.storage.getUserDetails()){
      this.userDetails = this.storage.getUserDetails();
    }
  }

  ngOnInit(): void {
  }

  logout(){
    this.storage.setToken('');
    this.storage.setUserDetails('');
    this.router.navigateByUrl('/login');
  }

}
