import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  @Input() dataLists: any
  constructor() { }

  ngOnInit(): void {
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

  getPhone(phone: any){
    return phone.substring(0, 4) + "XXXXXX";
  }

}
