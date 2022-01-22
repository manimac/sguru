import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { StorageService } from 'src/app/services/storage/storage.service';
// import {AgmMap, MapsAPILoader  } from '@agm/core';  
declare const google: any
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // @ViewChild(AgmMap,{static: true}) public agmMap: AgmMap;  
  isLoggedIn: boolean = false;
  formGroup: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    nationality: new FormControl('', Validators.required),
    religionid: new FormControl('', Validators.required),
    languageid: new FormControl('', Validators.required),
    casteid: new FormControl('', Validators.required),
    subCaste: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    national: new FormControl('', Validators.required),
    pincode: new FormControl('', Validators.required),
    occupation: new FormControl('', Validators.required),
    educational: new FormControl('', Validators.required),
    annualincome: new FormControl('', Validators.required),
    foodHabit: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    otp: new FormControl('')
  });
  religionLists: any = [];
  casteLists: any = [];
  languageLists: any = [];
  otpVerified: boolean = false;
  showOtp: boolean = false;
  currentOtp: any;
  today: any = new Date();
  previewImage: any = '';
  constructor(private storage: StorageService, private router: Router, private http: HttpRequestService
    // , private apiloader: MapsAPILoader
  ) {
    if (this.storage.getToken()) {
      this.router.navigate(['/inbox']);
    }
    let userData: any = localStorage.getItem('signup-user');
    if (userData) {
      userData = JSON.parse(userData);
      this.formGroup.patchValue(userData);
      // if (userData.otpVerified) {
      //   this.otpVerified = userData.otpVerified
      // }
      // if (userData.currentOtp) {
      //   this.currentOtp = userData.currentOtp
      //   this.showOtp = true
      // }
    }
    this.today = this.formatDate(this.today);
  }

  ngOnInit(): void {
    this.Initialize();
    // this.get();
  }

  Initialize() {
    this.http.get('languages').subscribe(
      (response: any) => {
        this.languageLists = response;
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
    this.http.get('religion').subscribe(
      (response: any) => {
        this.religionLists = response;
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
    this.http.get('caste').subscribe(
      (response: any) => {
        this.casteLists = response;
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
    this.http.get('caste').subscribe(
      (response: any) => {
        this.casteLists = response;
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
  }

  get() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        if (position) {
          let lat: any = position.coords.latitude;
          let lng = position.coords.longitude;
          // this.getAddress = (lat, lng)  
          console.log(position)
          // this.apiloader.load().then(() => {  
          let geocoder = new google.maps.Geocoder;
          let latlng = {
            lat: lat,
            lng: lng
          };
          geocoder.geocode({
            'location': latlng
          }, function (results: any) {
            if (results[0]) {
              let currentLocation = results[0].formatted_address;
              console.log(currentLocation);
            } else {
              console.log('Not found');
            }
          });
          // });  
        }
      })
    }
  }

  onFileChange(file: any) {
    this.formGroup.patchValue({
      image: file[0]
    });
    // this.previewImage = URL.createObjectURL(file[0]);
    const reader = new FileReader();
    reader.onload = e => this.previewImage = reader.result;

    reader.readAsDataURL(file[0]);
  }

  formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  resendOtp() {
    this.currentOtp = Math.floor(100000 + Math.random() * 900000);
    this.http.sendOtpSms(this.formGroup.value.phone, this.formGroup.value.firstname, this.currentOtp);
    this.showOtp = true;
    this.http.successMessage("Otp sent successfully");
  }

  register() {
    this.storage.addLoader.emit();
    this.http.post('user/mobileNumberExist', { phone: this.formGroup.value.phone }).subscribe(
      (response: any) => {
        this.storage.removeLoader.emit();
        if (this.otpVerified) {
          // this.showOtp = false;
          this.create();
        }
        else {
          this.currentOtp = Math.floor(100000 + Math.random() * 900000);
          this.http.sendOtpSms(this.formGroup.value.phone, this.formGroup.value.firstname, this.currentOtp);
          this.showOtp = true;
          this.http.successMessage("Otp sent successfully");
        }
      },
      (error: any) => {
        this.http.exceptionHandling(error);
        this.storage.removeLoader.emit();
      }
    )
  }

  verify() {
    if (this.currentOtp == this.formGroup.value.otp) {
      // this.showOtp = false;
      this.otpVerified = true;
      this.register();
    }
    else {
      this.http.errorMessage("Please enter the Valip OTP");
    }
  }

  verifyotp() {
    this.storage.addLoader.emit();
    this.http.post('user/mobileNumberExist', { phone: this.formGroup.value.phone }).subscribe(
      (response: any) => {
        this.showOtp = true;
        this.otpVerified = true;
        this.formGroup.patchValue({ otp: '' });
        this.currentOtp = Math.floor(100000 + Math.random() * 900000);
        this.http.sendOtpSms(this.formGroup.value.phone, this.formGroup.value.firstname, this.currentOtp);
        this.http.successMessage("Otp sent successfully");
        this.storage.removeLoader.emit();
      },
      (error: any) => {
        this.http.exceptionHandling(error);
        this.storage.removeLoader.emit();
      })

  }

  updateMobile() {
    this.otpVerified = false;
    this.showOtp = false;
  }

  create() {
    this.http.post('checkUnregistered', { phone: this.formGroup.value.phone }).subscribe(
      (exist: any) => {
        let assignedby = 1010;
        if (exist.rows && Array.isArray(exist.rows) && (exist.rows.length > 0)) {
          assignedby = exist.rows[0].assignedby;
        }
        let nextCall = this.formatDate(new Date());
        let params: any = {
          firstname: this.formGroup.value.firstname,
          lastname: this.formGroup.value.lastname,
          phone: this.formGroup.value.phone,
          password: this.formGroup.value.password,
          email: 'yyyyyy@gmail.com',
          status: 2,
          assignedby: assignedby,
          nextcall: nextCall
        };
        this.http.postAuth('signup-user', params).subscribe(
          (response: any) => {
            this.storage.setToken(response.user.token);
            this.storage.setUserDetails(response.user);
            this.profileCreate(response.userid, assignedby);
          },
          (error: any) => {
            this.http.exceptionHandling(error);
          }
        )
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )

  }

  updateReligion() {
    this.formGroup.patchValue({ casteid: '' });
  }

  profileCreate(userid: any, assignedby: any) {
    let _form = new FormData();
    _form.append('gender', this.formGroup.value.gender);
    _form.append('dob', this.formGroup.value.dob);
    _form.append('nationality', this.formGroup.value.nationality);
    _form.append('religionid', this.formGroup.value.religionid);
    _form.append('languageid', this.formGroup.value.languageid);
    _form.append('casteid', this.formGroup.value.casteid);
    _form.append('subCaste', this.formGroup.value.subCaste);
    _form.append('city', this.formGroup.value.city);
    _form.append('state', this.formGroup.value.state);
    _form.append('national', this.formGroup.value.national);
    _form.append('pincode', this.formGroup.value.pincode);
    _form.append('occupation', this.formGroup.value.occupation);
    _form.append('educational', this.formGroup.value.educational);
    _form.append('annualincome', this.formGroup.value.annualincome);
    _form.append('foodHabit', this.formGroup.value.foodHabit);
    _form.append('image', this.formGroup.value.image);
    _form.append('userid', userid);
    _form.append('preferencereligionid', this.formGroup.value.religionid);
    _form.append('preferencecasteid', this.formGroup.value.casteid);
    _form.append('preferencelanguageid', this.formGroup.value.languageid);
    _form.append('preferencefoodHabit', this.formGroup.value.foodHabit);
    this.storage.addLoader.emit();
    this.http.post('user/createProfile', _form).subscribe(
      (response: any) => {
        this.createHistory(userid, assignedby);
        this.storage.removeLoader.emit();
      },
      (error: any) => {
        this.http.exceptionHandling(error);
        this.storage.removeLoader.emit();
      }
    )
  }

  createHistory(userid: any, assignedby: any) {
    let nextCall = this.formatDate(new Date());
    let params = {
      employee: assignedby,
      callbackstatus: '',
      nextcall: nextCall,
      remarks: '',
      activity: 'Registered',
      profile: userid,
    }
    this.http.post('history/create', params).subscribe(
      (response: any) => {
        this.formGroup.reset();
        this.router.navigate(['/profile']);
        this.http.successMessage("Registered Successfully");
        localStorage.setItem('signup-user', '');
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
