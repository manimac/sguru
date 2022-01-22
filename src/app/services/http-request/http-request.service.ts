import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  private baseUrl = environment.baseurl;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  setHeaders() {
    return ({ 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*', 'Authorization': localStorage.getItem('jwtToken') || '' });
  }

  get(url: any) {
    const headers = this.setHeaders();
    return this.http.get(this.baseUrl + url, { headers });
  }

  post(url: any, body: any) {
    const headers = this.setHeaders();
    return this.http.post(this.baseUrl + url, body, { headers });
  }

  sendSms(url: any) {
    const headers = this.setHeaders();
    return this.http.get(url);
  }

  postAuth(url: any, body: any) {
    const headers = this.setHeaders();
    return this.http.post(environment.authurl + url, body, { headers });
  }

  delete(url: any, id: any) {
    const headers = this.setHeaders();
    return this.http.delete(this.baseUrl + url + id, { headers });
  }

  successMessage(message: any) {
    this.toastr.success(message);
  }

  errorMessage(message: any) {
    this.toastr.error(message);
  }

  exceptionHandling(error: any) {
    if (error && error.error && error.error.message) {
      this.toastr.error(error.error.message);
    }
    else if (error && error.error) {
      this.toastr.error(error.error);
    }
    else {
      this.toastr.error("Request Failed");
    }
  }

  sendOtpSms(phone: any, firstname: any, currentOtp: any) {
    // let baseurl = ``;
    // if(location.protocol == 'https:'){
    //   baseurl = `https://www.smsintegra.net/`;
    // }
    // else{
    //   baseurl = `http://www.smsintegra.com/`;
    // }
    // let url = baseurl + `api/smsapi.aspx?uid=shaadhiguru&pwd=11985&mobile=` + phone + `&msg=Dear%20` + firstname + `,%20Your%20mobile%20number%20verification%20PIN%20is%20` + currentOtp + `%20-%20www.shaadhiguru.com%20Modern%20Office&sid=FrmShG&type=0&dtTimeNow=xxxxx&entityid=1601414164024691516&tempid=1607100000000180311`
    let params = {
      phone: phone,
      firstname: firstname,
      currentOtp: currentOtp,
      protocol: location.protocol,
    }
    this.post('sendsms', params).subscribe(
    // this.sendSms(url).subscribe(
      (response: any) => {
      },
      (error: any) => {
        // this.http.exceptionHandling(error);
      }
    )
  }


}
