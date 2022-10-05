import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './component/footer/footer.component';
import { QuizComponent } from './component/quiz/quiz.component';
import { ErrorComponent } from './page/error-page/error.component';
import { WelcomePageComponent } from './page/welcome-page/welcome-page.component';
import { FinishPageComponent } from './page/finish-page/finish-page.component';
import { AllQuizComponent } from './page/all-quiz/all-quiz.component';
import { StartPageComponent } from './page/start-page/start-page.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { RuleComponent } from './component/rule/rule.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { QuizTestComponent } from './page/quiz-test/quiz-test.component';
import { NotifierComponent } from './component/notifier/notifier.component';
import { AdminComponent } from './component/admin/admin.component';
import { ForgetpasswordComponent } from './page/forgetpassword/forgetpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    QuizComponent,
    ErrorComponent,
    WelcomePageComponent,
    FinishPageComponent,
    AllQuizComponent,
    StartPageComponent,
    LoginComponent,
    RegisterComponent,
    RuleComponent,
    QuizTestComponent,
    NotifierComponent,
    AdminComponent,
    ForgetpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
