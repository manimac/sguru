import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'src/app/services/http-request/http-request.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { environment } from 'src/environments/environment';
declare var Razorpay: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  amount: any;
  userDetails: any;
  constructor(private http: HttpRequestService, private storage: StorageService) {
    this.userDetails = this.storage.getUserDetails();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.http.get('annualfee').subscribe(
      (response: any) => {
        if (response && Array.isArray(response) && (response.length > 0)) {
          this.amount = response[0].description;
        }
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
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

  payNow() {
    if (this.amount) {
      let self = this;
      var options = {
        // "key": "rzp_live_tsl3bqhdmyI4jh", 
        "key": environment.paymentKey,
        "amount": this.amount ? (this.amount * 100) : 0,
        "currency": "INR",
        "name": this.userDetails.firstname,
        "description": 'Shaadhi Guru Premium',
        "handler": function (response: any) {
          if (response.razorpay_payment_id) {
            self.save(response.razorpay_payment_id);
          }
        },
        "prefill": {
          "name": this.userDetails.firstname,
          "contact": this.userDetails.phone
        },
        "theme": {
          "color": "#3399cc"
        }
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
    }
  }

  save(paymentid: any) {
    let params: any = {
      id: this.storage.getUserid(),
      nextCall: this.formatDate(new Date()),
      amount: this.amount,
      paymentid: paymentid,
    }
    this.http.post('order/createOrder', params).subscribe(
      (response: any) => {
        let obj = {
          phone: this.userDetails.phone,
          firstname: this.userDetails.firstname,
          invoice: paymentid,
          price: this.amount
        }
        this.paidSMS(obj);
        this.storage.setPrime();
        this.http.successMessage("Payment Successfully");
        setTimeout(() => {
          location.reload();
        })
      },
      (error: any) => {
        this.http.exceptionHandling(error);
      }
    )
  }

  paidSMS(params: any) {
    this.http.post('sendPaidsms', params).subscribe(
      (response: any) => {
        
      },
      (error: any) => {
      }
    )
  }

}
