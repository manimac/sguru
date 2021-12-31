import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  joinNow: boolean = true;
  verifyOtp: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  showVerifySection(){
    this.joinNow = false;
    this.verifyOtp = true;
  }

}
