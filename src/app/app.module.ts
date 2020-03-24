import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {
  NG_VALIDATORS,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

// Material Components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LocalStorageModule } from 'angular-2-local-storage';
import { InlineSVGModule } from 'ng-inline-svg';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

// App components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './routes/auth/login/login.component';
import { SignupComponent } from './routes/auth/signup/signup.component';
import { ForgotPasswordComponent } from './routes/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './routes/auth/reset-password/reset-password.component';
import { PageNotFoundComponent } from './routes/page-not-found/page-not-found.component';
import { HomeComponent } from './routes/home/home.component';
import { DashboardComponent } from './routes/home/dashboard/dashboard.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChatComponent } from './routes/home/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    PageNotFoundComponent,
    HomeComponent,
    DashboardComponent,
    ToolbarComponent,
    FooterComponent,
    ChatComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    LocalStorageModule.forRoot({
      prefix: 'gl',
      storageType: 'localStorage'
    }),
    InlineSVGModule.forRoot(),
    RecaptchaModule,
    RecaptchaFormsModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatListModule,
    MatTooltipModule,
    MatStepperModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatTableModule,
    MatRadioModule,
    MatCheckboxModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatListModule,
    MatTooltipModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTableModule,
    MatRadioModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: 3000 }
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      `mtx_logo`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/mtx.svg')
    );
  }
}
