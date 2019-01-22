import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './question/question.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Group } from './group/group.model';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class TeacherDataService {

  //attributen
  private readonly _appUrl = '/API/teachers';

  //ctors
  constructor(private http: HttpClient) {}

  //methods
  get questions(): Observable<Question[]> {
    return this.http
      .get(`${this._appUrl}/questions/`)
      .pipe(map((list: any[]): Question[] => list.map(Question.fromJSON)));
  }

  get questionsAnswered(): Observable<Question[]> {
    return this.http
    .get(`${this._appUrl}/groupquestions/`)
    .pipe(map((list: any[]): Question[] => list.map(Question.fromJSONGroup)));
  }

  get groups() : Observable<Group[]> {
    return this.http
    .get(`${this._appUrl}/codes/`)
    .pipe(map((list: any[]): Group[] => list.map(Group.fromJSON)));
  }
   getGroup(id : string): Observable<Group> {
    return this.http
    .get(`${this._appUrl}/group/${id}`)
    .pipe(map((list: any): Group =>Group.fromJSON(list))); 
  }
  createGroups(amount) : Observable<Group[]> {
    return this.http.post(`${this._appUrl}/makegroups/`, {amount:amount}).pipe(map((list: any[]): Group[] => list.map(Group.fromJSON)));
  }
  deleteGroups() {
    
    return this.http
      .delete(`${this._appUrl}/removeGroups/`);
  }
  deleteGroup(group){
    return this.http
      .delete(`${this._appUrl}/removeGroup/${group.id}`);
  }
}
