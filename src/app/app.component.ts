import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  showLoader: boolean = false;
  constructor(public router: Router, private storage: StorageService){
  }

  ngOnInit(){
    this.storage.addLoader.subscribe(
      (response)=>{
        this.showLoader = true;
      }
    )
    this.storage.removeLoader.subscribe(
      (response)=>{
        this.showLoader = false;
      }
    )
  }
}
