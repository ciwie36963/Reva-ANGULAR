import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { Question } from "./question/question.model";
import { Group } from "./group/group.model";
import { TeacherDataService } from "./teacher-data.service";


@Injectable()
export class GroupResolver implements Resolve<Group> {
    constructor(private _teacherService:TeacherDataService){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Group> {
        return this._teacherService.getGroup(route.params['id']);
    }
}