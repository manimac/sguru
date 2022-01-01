import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showJoinNowSection() {
    this.joinNow = true;
    this.verifyOtp = false;
    this.verifyFormGroup.reset();
  }

  showVerifySection() {
    this.joinNow = false;
    this.verifyOtp = true;
  }

  submitVerify() {
    this.router.navigate(['/profile']);
  }

}
