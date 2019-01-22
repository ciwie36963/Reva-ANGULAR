import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErgoStudentDataService } from "./ergo-student-data.service";
import { QuestionComponent } from "../ergo-admin/question/question.component";
import { QuestionListComponent } from "../ergo-admin/question-list/question-list.component";
import { QuestionFilterPipe } from "../ergo-admin/question-filter.pipe";
import { AddQuestionComponent } from '../ergo-admin/add-question/add-question.component';
import { ErgoStudentRoutingModule } from "./ergo-student-routing.module";
import { basehttpInterceptorProviders } from "../../../interceptors";
import { httpInterceptorProviders } from "../../../core/auth/http-interceptors";
//import { httpInterceptorProviders, basehttpInterceptorProviders } from "../http-interceptors";


@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    ErgoStudentRoutingModule
  ],
  declarations: [
    
  ],
  providers: [
    //basehttpInterceptorProviders,
    //httpInterceptorProviders,
    ErgoStudentDataService,
    basehttpInterceptorProviders,
    httpInterceptorProviders
  ] 
})
export class ErgoStudentModule { }