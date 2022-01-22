import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcceptNumberOnlyDirective } from './directives/accept-number-only.directive';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { InboxComponent } from './pages/inbox/inbox.component';
import { RegisterComponent } from './pages/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { TermsandConditionsComponent } from './pages/cms/termsand-conditions/termsand-conditions.component';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { RefundPolicyComponent } from './pages/cms/refund-policy/refund-policy.component';
import { AboutComponent } from './pages/cms/about/about.component';
import { PrivacyPolicyComponent } from './pages/cms/privacy-policy/privacy-policy.component';
import { CasteFilterPipe } from './pipes/caste-filter.pipe';
import { ContactUsComponent } from './pages/cms/contact-us/contact-us.component';
// import { AgmCoreModule  } from '@agm/core';  
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProfileComponent,
    AcceptNumberOnlyDirective,
    LoginComponent,
    InboxComponent,
    RegisterComponent,
    PreferencesComponent,
    PaymentComponent,
    TermsandConditionsComponent,
    ProfileDetailComponent,
    RefundPolicyComponent,
    AboutComponent,
    PrivacyPolicyComponent,
    CasteFilterPipe,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgbModule,
    TabsModule.forRoot()
    // AgmCoreModule.forRoot({  
    //   apiKey: 'AIzaSyCz_--Ff0GGyu5dir4vugNe_2DbYlPOQ2g'  
    // }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
