import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionListComponent } from '../ergo-admin/question-list/question-list.component';
import { AddQuestionComponent } from '../ergo-admin/add-question/add-question.component';

const routes: Routes= [
    { path: 'list', component: QuestionListComponent},
    { path: "editquestion/:id", component: AddQuestionComponent}
  ];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ErgoStudentRoutingModule {
}
