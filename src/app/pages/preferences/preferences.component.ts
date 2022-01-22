import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  typeahead: FormControl = new FormControl();

  suggestions: any = [];

  suggest() {
    this.suggestions = this.casteLists
      .filter((c: any) => c.description.toLowerCase().startsWith((this.preferenceFormGroup.value.preferencecasteid && (typeof this.preferenceFormGroup.value.preferencecasteid=='string')) ? this.preferenceFormGroup.value.preferencecasteid.toLowerCase() : ''))
      .slice(0, 5);
  }

  preferenceFormGroup: FormGroup = new FormGroup({
    preferencereligionid: new FormControl(''),
    preferencecasteid: new FormControl(''),
    preferencelanguageid: new FormControl(''),
    preferencefoodHabit: new FormControl('')
  })
  languageLists: any = [];
  religionLists: any = [];
  casteLists: any = [];
  userDetails: any = {};
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
  }

  updateReligion(){
    this.preferenceFormGroup.patchValue({preferencecasteid: ''});
  }

  loadProfile() {
    let userid = this.storage.getUserid();
    this.storage.addLoader.emit();
    this.http.post('user/profileView', { filterSearch: userid }).subscribe(
      (response: any) => {
        this.storage.removeLoader.emit();
        if (response.data && Array.isArray(response.data) && (response.data.length > 0)) {
          this.userDetails = response.data[0];
          let params: any = {
            preferencereligionid: (this.userDetails.UserProfile&&this.userDetails.UserProfile.preferencereligion) ? this.userDetails.UserProfile.preferencereligion.id : '',
            preferencecasteid: (this.userDetails.UserProfile&&this.userDetails.UserProfile.preferencecaste) ? this.userDetails.UserProfile.preferencecaste.id : '',
            preferencelanguageid: (this.userDetails.UserProfile&&this.userDetails.UserProfile.preferencelanguage) ? this.userDetails.UserProfile.preferencelanguage.id : '',
            preferencefoodHabit: this.userDetails.UserProfile ? this.userDetails.UserProfile.preferencefoodHabit : ''
          }
          this.preferenceFormGroup.patchValue(params);
        }
      },
      (error: any) => {
        this.http.exceptionHandling(error);
        this.storage.removeLoader.emit();
      }
    )
  }

  profileUpdate(element: HTMLElement) {
    let _form = new FormData();
    _form.append('id', this.userDetails.UserProfile ? this.userDetails.UserProfile.id: null);
    _form.append('preferencelanguageid', this.preferenceFormGroup.value['preferencelanguageid']);
    _form.append('preferencereligionid', this.preferenceFormGroup.value['preferencereligionid']);
    _form.append('preferencecasteid', this.preferenceFormGroup.value['preferencecasteid']);
    _form.append('preferencefoodHabit', this.preferenceFormGroup.value['preferencefoodHabit']);
    this.storage.addLoader.emit();
    this.http.post('user/updateProfile', _form).subscribe(
      (response: any) => {
        this.loadProfile();
        this.http.successMessage("Preference Updated Successfully");       
        this.storage.removeLoader.emit();
      },
      (error: any) => {
        this.http.exceptionHandling(error);
        this.storage.removeLoader.emit();
      }
    )
  }

}
