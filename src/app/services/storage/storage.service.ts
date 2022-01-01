import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setToken(params: any){
    localStorage.setItem('jwtToken', JSON.stringify(params));
  }

  getToken(){
    let token = localStorage.getItem('jwtToken')
    if(token){
      token = JSON.parse(token);
    }
    return token;
  }

  setUserDetails(params: any){
    localStorage.setItem('jwtUserDetails', JSON.stringify(params));
  }

  getUserDetails(){
    let userDetails = localStorage.getItem('jwtUserDetails')
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
}
