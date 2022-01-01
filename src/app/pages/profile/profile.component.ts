import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  basicDetailsFormGroup: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl(''),
    gender: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    dob: new FormControl(''),
    timeOfBirth: new FormControl(''),
    placeOfBirth: new FormControl(''),
    relationship: new FormControl(''),
    birthstarid: new FormControl(''),
    birthrasiid: new FormControl(''),
    languageid: new FormControl(''),
    religionid: new FormControl(''),
    casteid: new FormControl(''),
    subCaste: new FormControl(''),
    image: new FormControl('')
  })
  careerFormGroup: FormGroup = new FormGroup({
    maritialStatus: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    national: new FormControl(''),
    pincode: new FormControl(''),
    educational: new FormControl(''),
    educationalOption: new FormControl(''),
    occupation: new FormControl(''),
    career: new FormControl(''),
    annualincome: new FormControl(''),
    nationality: new FormControl('')
  })
  healthFormGroup: FormGroup = new FormGroup({
    foodHabit: new FormControl(''),
    drinking: new FormControl(''),
    smoking: new FormControl(''),
    physicallyChallenged: new FormControl(''),
    height: new FormControl(''),
    weight: new FormControl(''),
    anyHealthIssues: new FormControl('')
  })
  preferenceFormGroup: FormGroup = new FormGroup({
    religionid: new FormControl(''),
    casteid: new FormControl(''),
    languageid: new FormControl(''),
    foodHabit: new FormControl('')
  })
  paymentFormGroup: FormGroup = new FormGroup({
    email: new FormControl(''),
    alternativeMobile: new FormControl(''),
    aadharnumber: new FormControl('')
  });
  languageLists: any = [];
  religionLists: any = [];
  casteLists: any = [];
  birthrasiLists: any = [];
  birthstarLists: any = [];
  maritialStatusLists: any = [
    'Unmarried',
    'Widow',
    'Divorcee'
  ];
  basicDetailsSection: boolean = false;
  careerSection: boolean = false;
  healthSection: boolean = false;
  preferenceSection: boolean = false;
  paymentSection: boolean = false;
  constructor(private http: HttpRequestService) { }

  ngOnInit(): void {
    this.initialize();
    this.showBasicDetails();
  }

  initialize() {
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
    this.http.get('birthstar').subscribe(
      (response: any) => {
        this.birthstarLists = response;
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
    this.http.get('birthrasi').subscribe(
      (response: any) => {
        this.birthrasiLists = response;
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
  }

  showBasicDetails(){
    this.basicDetailsSection = true;
    this.careerSection = false;
    this.healthSection = false;
    this.preferenceSection = false;
    this.paymentSection = false;
  }

  showCareer(){
    this.basicDetailsSection = false;
    this.careerSection = true;
    this.healthSection = false;
    this.preferenceSection = false;
    this.paymentSection = false;
  }

  showHealth(){
    this.basicDetailsSection = false;
    this.careerSection = false;
    this.healthSection = true;
    this.preferenceSection = false;
    this.paymentSection = false;
  }

  showPreference(){
    this.basicDetailsSection = false;
    this.careerSection = false;
    this.healthSection = false;
    this.preferenceSection = true;
    this.paymentSection = false;
  }

  showPayment(){
    this.basicDetailsSection = false;
    this.careerSection = false;
    this.healthSection = false;
    this.preferenceSection = false;
    this.paymentSection = true;
  }

}
