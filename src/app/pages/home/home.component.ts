import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { StorageService } from 'src/app/services/storage/storage.service';

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
  isLoggedIn: boolean = false;
  dataLists: any = [];
  userPaid: boolean = false;
  currentOtp: any;
  constructor(private router: Router, private http: HttpRequestService, private storage: StorageService) {
    if (this.storage.getToken()) {
      this.isLoggedIn = true;
      this.loadProfiles();
    }
    if (this.storage.isPaid()) {
      this.userPaid = true;
    }
    localStorage.setItem('signup-user', '');
  }

  ngOnInit(): void {
  }

  loadProfiles() {
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

  showJoinNowSection() {
    this.joinNow = true;
    this.verifyOtp = false;
    this.verifyFormGroup.reset();
  }

  showVerifySection() {
    this.currentOtp = '';
    this.http.post('user/mobileNumberExist', { phone: this.joinFormGroup.value.phone }).subscribe(
      (response: any) => {
        this.currentOtp = Math.floor(100000 + Math.random() * 900000);        
        this.http.sendOtpSms(this.joinFormGroup.value.phone, this.joinFormGroup.value.firstname, this.currentOtp);
        let params: any = {
          firstname: this.joinFormGroup.value.firstname,
          lastname: this.joinFormGroup.value.lastname,
          phone: this.joinFormGroup.value.phone,
          password: '',
          gender: this.joinFormGroup.value.gender,
          email: 'yyyyyy@gmail.com',
          status: 2,
          otpVerified: false,
          currentOtp: this.currentOtp
        };
        localStorage.setItem('signup-user', JSON.stringify(params));
        this.router.navigate(['/register']);
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
    // this.currentOtp = '';
    // this.http.post('user/mobileNumberExist', { phone: this.joinFormGroup.value.phone }).subscribe(
    //   (response: any) => {
    //     this.currentOtp = Math.floor(100000 + Math.random() * 900000);
    //     let url = `http://www.smsintegra.com/api/smsapi.aspx?uid=shaadhiguru&pwd=11985&mobile=` + this.joinFormGroup.value.phone +`&msg=Dear%20` + this.joinFormGroup.value.firstname +`,%20Your%20mobile%20number%20verification%20PIN%20is%20` + this.currentOtp +`%20-%20www.shaadhiguru.com%20Modern%20Office&sid=FrmShG&type=0&dtTimeNow=xxxxx&entityid=1601414164024691516&tempid=1607100000000180311`
    //     this.http.sendSms(url).subscribe(
    //       (response: any) => {
    //         this.joinNow = false;
    //         this.verifyOtp = true;
    //       },
    //       (error: any) => {
    //         // this.http.exceptionHandling(error);
    //       }
    //     )
    //     this.joinNow = false;
    //         this.verifyOtp = true;
    //   },
    //   (error: any) => {
    //     this.http.exceptionHandling(error);
    //   }
    // )
  }

  submitVerify() {
    if (this.currentOtp == this.verifyFormGroup.value.otp) {
      let params: any = {
        firstname: this.joinFormGroup.value.firstname,
        lastname: this.joinFormGroup.value.lastname,
        phone: this.joinFormGroup.value.phone,
        password: this.verifyFormGroup.value.password,
        gender: this.joinFormGroup.value.gender,
        email: 'yyyyyy@gmail.com',
        status: 2,
        otpVerified: false
      };
      localStorage.setItem('signup-user', JSON.stringify(params));
      this.router.navigate(['/register']);
    }
    else {
      this.http.errorMessage("Please enter the Valip OTP");
    }

    // this.http.postAuth('signup-user', params).subscribe(
    //   (response: any) => {
    //     this.storage.setToken(response.user.token);
    //     this.storage.setUserDetails(response.user);
    //     this.profileCreate(response.userid);
    //   },
    //   (error: any) => {
    //     this.http.exceptionHandling(error);
    //   }
    // )
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
        setTimeout(() => {
          location.reload();
        })
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
  }

}
