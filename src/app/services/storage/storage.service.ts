import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  addLoader: EventEmitter<any> = new EventEmitter();
  removeLoader: EventEmitter<any> = new EventEmitter();
  constructor() { }

  setToken(params: any){
    localStorage.setItem('jwtProfileToken', JSON.stringify(params));
  }

  getToken(){
    let token = localStorage.getItem('jwtProfileToken')
    if(token){
      token = JSON.parse(token);
    }
    return token;
  }

  setUserDetails(params: any){
    localStorage.setItem('jwtProfileUserDetails', JSON.stringify(params));
  }

  getUserDetails(){
    let userDetails = localStorage.getItem('jwtProfileUserDetails')
    if(userDetails){
      userDetails = JSON.parse(userDetails);
    }
    return userDetails;
  }

  getRole(){
    let userDetails: any = this.getUserDetails();
    return userDetails.role;
  }

  getUserid(){
    let userDetails: any = this.getUserDetails();
    return userDetails.id;
  }

  isPaid(){
    let result: any = false;
    let userDetails: any = this.getUserDetails();
    if(userDetails && userDetails.status==3){
      result = true;
    }
    return result;
  }

  isAdmin(){
    let result: any = false;
    let userDetails: any = this.getUserDetails();
    if(userDetails.role==1){
      result = true;
    }
    return result;
  }

  isManager(){
    let result: any = false;
    let userDetails: any = this.getUserDetails();
    if(userDetails.role==2){
      result = true;
    }
    return result;
  }

  isEmployee(){
    let result: any = false;
    let userDetails: any = this.getUserDetails();
    if(userDetails.role==3){
      result = true;
    }
    return result;
  }

  setPrime(){
    let userDetails: any = this.getUserDetails();
    if(userDetails.status!=3){
      userDetails.status = 3;
    }
    this.setUserDetails(userDetails);
  }
}
