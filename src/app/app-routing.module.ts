import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { InboxComponent } from './pages/inbox/inbox.component';
import { RegisterComponent } from './pages/register/register.component';
import { TermsandConditionsComponent } from './pages/cms/termsand-conditions/termsand-conditions.component';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { AboutComponent } from './pages/cms/about/about.component';
import { PrivacyPolicyComponent } from './pages/cms/privacy-policy/privacy-policy.component';
import { RefundPolicyComponent } from './pages/cms/refund-policy/refund-policy.component';
import { ContactUsComponent } from './pages/cms/contact-us/contact-us.component';
import { PaymentComponent } from './pages/payment/payment.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'inbox', component: InboxComponent, canActivate: [AuthGuardService] },
  { path: 'profile-detail', component: ProfileDetailComponent, canActivate: [AuthGuardService] },
  { path: 'preferences', component: PreferencesComponent, canActivate: [AuthGuardService] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'terms-and-conditions', component: TermsandConditionsComponent },
  { path: 'refund-policy', component: RefundPolicyComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: '**', component: HomeComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
  ]
})
export class AppRoutingModule { }
