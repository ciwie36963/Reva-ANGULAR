import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { basehttpInterceptorProviders } from '../../../interceptors';
import { AddQuestionComponent } from './add-question/add-question.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionFilterPipe } from './question-filter.pipe';
import { QuestionComponent } from './question/question.component';
import { ErgoAdminRoutingModule } from './ergo-admin-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ErgoAdminDataService } from './ergo-admin-data.service';
import { httpInterceptorProviders } from '../../../core/auth/http-interceptors';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    ErgoAdminRoutingModule
  ],
  declarations: [
    QuestionComponent,
    QuestionFilterPipe,
    QuestionListComponent,
    AddQuestionComponent,
  ],
  providers: [
    //basehttpInterceptorProviders,
    //httpInterceptorProviders,
    ErgoAdminDataService,
    basehttpInterceptorProviders,
    httpInterceptorProviders
  ] 
})
export class ErgoAdminModule { }
