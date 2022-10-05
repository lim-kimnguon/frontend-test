import { QuizTestComponent } from './page/quiz-test/quiz-test.component';
import { FinishPageComponent } from './page/finish-page/finish-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { QuizComponent } from './component/quiz/quiz.component';
import { RuleComponent } from './component/rule/rule.component';
import { AllQuizComponent } from './page/all-quiz/all-quiz.component';
import { LoginComponent } from './component/login/login.component';
import { AuthenticationGuard } from './authentication.guard';
import { AdminComponent } from './component/admin/admin.component';
import { ForgetpasswordComponent } from './page/forgetpassword/forgetpassword.component';

const routes: Routes = [
  { path : '', redirectTo: '/login', pathMatch: 'full'},
  { path : 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
  { path : 'login', component: LoginComponent },
  { path : 'quiz', component: QuizComponent, canActivate: [AuthenticationGuard] },
  { path : 'all-quiz', component: AllQuizComponent, canActivate: [AuthenticationGuard] },
  { path : 'quiz-rule', component: RuleComponent, canActivate: [AuthenticationGuard] },
  { path : 'finish-page', component: FinishPageComponent, canActivate: [AuthenticationGuard]},
  { path : 'quiz-test', component: QuizTestComponent, canActivate: [AuthenticationGuard]},
  { path : 'forget-password', component: ForgetpasswordComponent},
  { path : 'admin', component: AdminComponent},
  { path:  '**' , component: HomeComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
