import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean = false;
  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  constructor(private storage: StorageService, private router: Router, private http: HttpRequestService) {
    if(this.storage.getToken()){
      this.router.navigate(['/inbox']);
    }
   }

  ngOnInit(): void {
  }

  login(){
    this.storage.addLoader.emit();
    this.http.post('api/login', this.formGroup.value).subscribe(
      (response: any)=>{
        this.storage.removeLoader.emit();
        this.storage.setToken(response.token);
        this.storage.setUserDetails(response);
        this.router.navigateByUrl('/login');
        setTimeout(()=>{
          location.reload();
        })
      },
      (error: any)=>{
        this.http.errorMessage("Invalid Credentials");
        this.storage.removeLoader.emit();
        // this.http.exceptionHandling(error);
      }
    )
  }

}
