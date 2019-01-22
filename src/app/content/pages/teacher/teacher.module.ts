import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { QuestionComponent } from "./question/question.component";
import { QuestionFilterPipe } from "./question-filter.pipe";
import { QuestionListComponent } from "./question-list/question-list.component";
import { TeacherDataService } from "./teacher-data.service";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { GroupComponent } from './group/group.component';
import { GroupListComponent } from './group-list/group-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TeacherRoutingModule } from "./teacher-routing.module";
import { basehttpInterceptorProviders } from "../../../interceptors";
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupResolver } from "./group-resolver";
import { GroupFilterPipe } from './group-filter.pipe';
import { httpInterceptorProviders } from "../../../core/auth/http-interceptors";
import { SecurePipe } from './secure.pipe';
// import { httpInterceptorProviders, basehttpInterceptorProviders } from "../http-interceptors";

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    TeacherRoutingModule,
  ],
  declarations: [
    QuestionComponent,
    QuestionFilterPipe,
    QuestionListComponent,
    GroupComponent,
    GroupListComponent,
    GroupDetailComponent,
    GroupFilterPipe,
    SecurePipe,
  ],
  providers: [
    //basehttpInterceptorProviders,
    //httpInterceptorProviders,
    TeacherDataService,
    basehttpInterceptorProviders,
    httpInterceptorProviders,
    GroupResolver
  ] 
})
export class TeacherModule { }