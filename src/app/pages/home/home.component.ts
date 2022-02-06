import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  joinNow: boolean = true;
  joinFormGroup: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl(''),
    gender: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)])
  })
  isLoggedIn: boolean = false;
  dataLists: any = [];
  empid: any;
  constructor(private router: Router, private http: HttpRequestService, private storage: StorageService, private route: ActivatedRoute) {
    if (this.storage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['/inbox']);
    }
    localStorage.setItem('signup-user', '');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.empid = params['empid'];
    });
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
  }

  showVerifySection() {
    this.http.post('user/mobileNumberExist', { phone: this.joinFormGroup.value.phone }).subscribe(
      (response: any) => {
        let params: any = {
          firstname: this.joinFormGroup.value.firstname,
          lastname: this.joinFormGroup.value.lastname,
          phone: this.joinFormGroup.value.phone,
          password: '',
          gender: this.joinFormGroup.value.gender,
          email: 'yyyyyy@gmail.com',
          status: 2
        };
        localStorage.setItem('signup-user', JSON.stringify(params));
        if(this.empid){
          this.router.navigate(['/register'], { queryParams: {empid: this.empid}});
        }
        else{
          this.router.navigate(['/register']);
        }
        
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
