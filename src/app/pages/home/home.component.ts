import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  joinNow: boolean = true;
  verifyOtp: boolean = false;
  joinFormGroup: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl(''),
    gender: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)])
  })
  verifyFormGroup: FormGroup = new FormGroup({
    otp: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  })
  constructor(private router: Router, private http: HttpRequestService) { }

  ngOnInit(): void {
  }

  showJoinNowSection() {
    this.joinNow = true;
    this.verifyOtp = false;
    this.verifyFormGroup.reset();
  }

  showVerifySection() {
    this.http.post('user/mobileNumberExist', {phone: this.joinFormGroup.value.phone}).subscribe(
      (response: any) => {
        this.joinNow = false;
        this.verifyOtp = true;
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
  }

  submitVerify() {
    let params: any = {
      firstname: this.joinFormGroup.value.firstname,
      lastname: this.joinFormGroup.value.lastname,
      phone: this.joinFormGroup.value.phone,
      password: this.verifyFormGroup.value.password,
      email: 'yyyyyy@gmail.com'
    };
    this.http.postAuth('signup-user', params).subscribe(
      (response: any) => {
        this.profileCreate(response.userid);
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
  }

  profileCreate(userid: any) {
    let _form = new FormData();
    _form.append('gender', this.joinFormGroup.value.gender);
    _form.append('userid', userid);
    this.http.post('user/createProfile', _form).subscribe(
      (response: any) => {
        this.joinFormGroup.reset();
        this.verifyFormGroup.reset();
        this.router.navigate(['/profile']);
        this.http.successMessage("Registered Successfully");
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
  }

}
