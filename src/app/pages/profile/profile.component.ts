import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { StorageService } from 'src/app/services/storage/storage.service';

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
    image: new FormControl(''),
    email: new FormControl(''),
    alternativeMobile: new FormControl(''),
    aadharnumber: new FormControl('')
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
  // paymentFormGroup: FormGroup = new FormGroup({
  //   email: new FormControl(''),
  //   alternativeMobile: new FormControl(''),
  //   aadharnumber: new FormControl('')
  // });
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
  basicDetailsSection: boolean = true;
  careerSection: boolean = false;
  healthSection: boolean = false;
  userDetails: any = {};
  imagePath: any = '';
  profileImage: any = '';
  constructor(private http: HttpRequestService, private storage: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.loadProfile();
    this.initialize();
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

  showBasicDetails(element: HTMLElement) {
    this.basicDetailsSection = true;
    this.careerSection = false;
    this.healthSection = false;
    element.scrollIntoView();
  }

  showCareer(element: HTMLElement) {
    this.basicDetailsSection = false;
    this.careerSection = true;
    this.healthSection = false;
    element.scrollIntoView();
  }

  showHealth(element: HTMLElement) {
    this.basicDetailsSection = false;
    this.careerSection = false;
    this.healthSection = true;
    element.scrollIntoView();
  }

  showPreference(element: HTMLElement) {
    this.basicDetailsSection = false;
    this.careerSection = false;
    this.healthSection = false;
    element.scrollIntoView();
  }

  showPayment(element: HTMLElement) {
    this.basicDetailsSection = false;
    this.careerSection = false;
    this.healthSection = false;
    element.scrollIntoView();
  }

  loadProfile() {
    let userid = this.storage.getUserid();
    this.storage.addLoader.emit();
    this.http.post('user/profileView', { filterSearch: userid }).subscribe(
      (response: any) => {
        if (response.data && Array.isArray(response.data) && (response.data.length > 0)) {
          this.userDetails = response.data[0];
          this.profileImage = this.userDetails.UserProfile ? this.userDetails.UserProfile.image : '';
          let params: any = {
            firstname: this.userDetails.firstname,
            lastname: this.userDetails.lastname,
            gender: this.userDetails.UserProfile ? this.userDetails.UserProfile.gender : '',
            phone: this.userDetails.phone,
            dob: this.userDetails.UserProfile ? this.userDetails.UserProfile.dob : '',
            timeOfBirth: this.userDetails.UserProfile ? this.userDetails.UserProfile.timeOfBirth : '',
            placeOfBirth: this.userDetails.UserProfile ? this.userDetails.UserProfile.placeOfBirth : '',
            relationship: this.userDetails.UserProfile ? this.userDetails.UserProfile.relationship : '',
            birthstarid: this.userDetails.UserProfile ? this.userDetails.UserProfile.birthstarid : '',
            birthrasiid: this.userDetails.UserProfile ? this.userDetails.UserProfile.birthrasiid : '',
            languageid: this.userDetails.UserProfile ? this.userDetails.UserProfile.languageid : '',
            religionid: this.userDetails.UserProfile ? this.userDetails.UserProfile.religionid : '',
            casteid: this.userDetails.UserProfile ? this.userDetails.UserProfile.casteid : '',
            subCaste: this.userDetails.UserProfile ? this.userDetails.UserProfile.subCaste : '',
            image: this.userDetails.UserProfile ? this.userDetails.UserProfile.image : ''
          };
          this.basicDetailsFormGroup.patchValue(params);
          let params2: any = {
            maritialStatus: this.userDetails.UserProfile ? this.userDetails.UserProfile.maritialStatus : '',
            city: this.userDetails.UserProfile ? this.userDetails.UserProfile.city : '',
            state: this.userDetails.UserProfile ? this.userDetails.UserProfile.state : '',
            national: this.userDetails.UserProfile ? this.userDetails.UserProfile.national : '',
            pincode: this.userDetails.UserProfile ? this.userDetails.UserProfile.pincode : '',
            educational: this.userDetails.UserProfile ? this.userDetails.UserProfile.educational : '',
            educationalOption: this.userDetails.UserProfile ? this.userDetails.UserProfile.educationalOption : '',
            occupation: this.userDetails.UserProfile ? this.userDetails.UserProfile.occupation : '',
            career: this.userDetails.UserProfile ? this.userDetails.UserProfile.career : '',
            annualincome: this.userDetails.UserProfile ? this.userDetails.UserProfile.annualincome : '',
            nationality: this.userDetails.UserProfile ? this.userDetails.UserProfile.nationality : ''
          }
          this.careerFormGroup.patchValue(params2);
          let params3: any = {
            foodHabit: this.userDetails.UserProfile ? this.userDetails.UserProfile.foodHabit : '',
            drinking: this.userDetails.UserProfile ? this.userDetails.UserProfile.drinking : '',
            smoking: this.userDetails.UserProfile ? this.userDetails.UserProfile.smoking : '',
            physicallyChallenged: this.userDetails.UserProfile ? this.userDetails.UserProfile.physicallyChallenged : '',
            height: this.userDetails.UserProfile ? this.userDetails.UserProfile.height : '',
            weight: this.userDetails.UserProfile ? this.userDetails.UserProfile.weight : '',
            anyHealthIssues: this.userDetails.UserProfile ? this.userDetails.UserProfile.anyHealthIssues : ''
          }
          this.healthFormGroup.patchValue(params3);
          let email: any = '';
          if(this.userDetails.email=='yyyyyy@gmail.com' || this.userDetails.email=='yyyyyy@gmail.com'){
            email = '';
          }
          else{
            email = this.userDetails.email;
          }
          let params5: any = {
            email: email,
            alternativeMobile: this.userDetails.alternativeMobile,
            aadharnumber: this.userDetails.UserProfile ? this.userDetails.UserProfile.aadharnumber : ''
          };
          this.basicDetailsFormGroup.patchValue(params5);
          this.imagePath = this.userDetails.path ? this.userDetails.path : '';
        }
        this.storage.removeLoader.emit();
      },
      (error: any) => {
        this.http.exceptionHandling(error);
        this.storage.removeLoader.emit();
      }
    )
  }

  onFileChange(file: any, element: HTMLElement) {
    this.basicDetailsFormGroup.patchValue({
      image: file[0]
    });
    this.saveProfile('', element);
  }

  payLater(element: HTMLElement){
    this.saveProfile('paylater', element);
  }

  payment(element: HTMLElement){
    this.saveProfile('paynow', element);
  }

  updateReligion(){
    this.basicDetailsFormGroup.patchValue({casteid: ''});
  }

  // removeFile(element: HTMLElement){
  //   this.basicDetailsFormGroup.patchValue({
  //     image: ''
  //   });
  //   this.saveProfile('', element);
  // }

  saveProfile(event: any, element: HTMLElement) {
    let params: any = {
      firstname: this.basicDetailsFormGroup.value.firstname,
      lastname: this.basicDetailsFormGroup.value.lastname,
      phone: this.basicDetailsFormGroup.value.phone,
      email: this.basicDetailsFormGroup.value.email,
      alternativeMobile: this.basicDetailsFormGroup.value.alternativeMobile,
      id: this.storage.getUserid()
    }
    this.storage.addLoader.emit();
    this.http.post('user/updateUser', params).subscribe(
      (response: any) => {
        this.storage.removeLoader.emit();
        this.profileUpdate(event, element);
      },
      (error: any) => {
        this.http.exceptionHandling(error);
        this.storage.removeLoader.emit();
      }
    )
  }

  profileUpdate(event: any, element: HTMLElement) {
    let _form = new FormData();
    _form.append('id', this.userDetails.UserProfile ? this.userDetails.UserProfile.id: null);
    _form.append('gender', this.basicDetailsFormGroup.value['gender']);
    _form.append('dob', this.basicDetailsFormGroup.value['dob']);
    _form.append('timeOfBirth', this.basicDetailsFormGroup.value['timeOfBirth']);
    _form.append('placeOfBirth', this.basicDetailsFormGroup.value['placeOfBirth']);
    _form.append('relationship', this.basicDetailsFormGroup.value['relationship']);
    _form.append('birthstarid', this.basicDetailsFormGroup.value['birthstarid']);
    _form.append('birthrasiid', this.basicDetailsFormGroup.value['birthrasiid']);
    _form.append('languageid', this.basicDetailsFormGroup.value['languageid']);
    _form.append('religionid', this.basicDetailsFormGroup.value['religionid']);
    _form.append('casteid', this.basicDetailsFormGroup.value['casteid']);
    _form.append('subCaste', this.basicDetailsFormGroup.value['subCaste']);
    _form.append('image', this.basicDetailsFormGroup.value['image']);
    _form.append('maritialStatus', this.careerFormGroup.value['maritialStatus']);
    _form.append('city', this.careerFormGroup.value['city']);
    _form.append('state', this.careerFormGroup.value['state']);
    _form.append('national', this.careerFormGroup.value['national']);
    _form.append('pincode', this.careerFormGroup.value['pincode']);
    _form.append('educational', this.careerFormGroup.value['educational']);
    _form.append('educationalOption', this.careerFormGroup.value['educationalOption']);
    _form.append('occupation', this.careerFormGroup.value['occupation']);
    _form.append('career', this.careerFormGroup.value['career']);
    _form.append('annualincome', this.careerFormGroup.value['annualincome']);
    _form.append('nationality', this.careerFormGroup.value['nationality']);
    _form.append('foodHabit', this.healthFormGroup.value['foodHabit']);
    _form.append('drinking', this.healthFormGroup.value['drinking']);
    _form.append('smoking', this.healthFormGroup.value['smoking']);
    _form.append('physicallyChallenged', this.healthFormGroup.value['physicallyChallenged']);
    _form.append('height', this.healthFormGroup.value['height']);
    _form.append('weight', this.healthFormGroup.value['weight']);
    _form.append('anyHealthIssues', this.healthFormGroup.value['anyHealthIssues']);
    _form.append('aadharnumber', this.basicDetailsFormGroup.value['aadharnumber']);
    this.storage.addLoader.emit();
    this.http.post('user/updateProfile', _form).subscribe(
      (response: any) => {
        this.loadProfile();
        if(event == 'showCareer'){
          this.showCareer(element);
        }
        else if(event == 'showHealth'){
          this.showHealth(element);
        }      
        else if(event == 'showPreference'){
          this.http.successMessage("Profile updated Successfully");
        }      
        this.storage.removeLoader.emit();
      },
      (error: any) => {
        this.http.exceptionHandling(error);
        this.storage.removeLoader.emit();
      }
    )
  }

}
