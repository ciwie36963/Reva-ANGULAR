import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgxPermissionsGuard } from 'ngx-permissions';
import { QuestionListComponent } from './question-list/question-list.component';
import { GroupedObservable } from 'rxjs';
import { GroupListComponent } from './group-list/group-list.component';
import { AuthGuardService } from '../../../core/auth/auth-guard.service';
import { GroupResolver } from './group-resolver';
import { GroupDetailComponent } from './group-detail/group-detail.component';

const routes: Routes= [
	{ path: 'list', component: QuestionListComponent, data: {groupA : false} },
	{ path: "groups", component: GroupListComponent},
	{ path: "group/:id", component: GroupDetailComponent, resolve: {group: GroupResolver}},
	{ path: 'groupsanswered', component: QuestionListComponent, data: {groupA : true} },
  ];

@NgModule({
	imports: [RouterModule.forChild(routes)]
})
export class TeacherRoutingModule {
}
