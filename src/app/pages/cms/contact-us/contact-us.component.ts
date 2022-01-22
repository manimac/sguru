import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactDetails: any = {};
  myFormGroup: any;
  constructor(private http: HttpRequestService) {
    this.http.get('contact').subscribe(
      (response: any) => {
        if(response && Array.isArray(response) && (response.length>0)){
          this.contactDetails = response[0];
        }
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
   }

  ngOnInit(): void {
    this.myFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    })
  }

  save(){
    this.http.post('enquiry/create', this.myFormGroup.value).subscribe(
      (response: any)=>{
        this.http.successMessage("Message sent Successfully.");
        this.myFormGroup.reset();
      }
    )
  }

  

}
