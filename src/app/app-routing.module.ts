import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './routes/auth/login/login.component';
import { SignupComponent } from './routes/auth/signup/signup.component';
import { ResetPasswordComponent } from './routes/auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './routes/auth/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './routes/page-not-found/page-not-found.component';
import { HomeComponent } from './routes/home/home.component';
import { ChatComponent } from './routes/home/chat/chat.component';
import { DashboardComponent } from './routes/home/dashboard/dashboard.component';


const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignupComponent },
  // { path: 'reset', component: ResetPasswordComponent },
  // { path: 'forgot', component: ForgotPasswordComponent },
  { path: '', component: ChatComponent },
  // {
  //   path: '',
  //   component: HomeComponent,
  //   children: [
  //     { path: 'home', component: DashboardComponent },
  //     { path: '', redirectTo: 'home', pathMatch: 'full' }
  //   ],
  //   canActivate: []
  // },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
