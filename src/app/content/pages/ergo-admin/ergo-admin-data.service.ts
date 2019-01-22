import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from './question/question.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Exhibitor } from '../admin/exhibitor/exhibitor.model';

@Injectable({
  providedIn: 'root'
})
export class ErgoAdminDataService {
  //attr
  private readonly _appUrl = '/API/ergo';
  //ctor
  constructor(private http: HttpClient) {}
  //methods

/*   getQuestion(id: string): Observable<Question> {
    return this.http
      .get(`${this._appUrl}/question/${id}`)
      .pipe(map(Question.fromJSON));
  } */
 
  getQuestion(id: string) {
    const theUrl = `${this._appUrl}/question/${id}`;
    return this.http.get(theUrl).pipe(map(Question.fromJSON));
  }

  getExhibitor(id: string) {
    const theUrl = `${this._appUrl}/exhibitor/${id}`
    let ex = this.http.get(theUrl).pipe(map(Exhibitor.fromJSON))
    return ex;
  }

  get questions(): Observable<Question[]> {
    return this.http
      .get(`${this._appUrl}/questions/`)
      .pipe(map((list: any[]): Question[] => list.map(Question.fromJSON)));
  }
  get exhibitors(): Observable<Exhibitor[]> {
    return this.http
    .get(`${this._appUrl}/exhibitors/`)
    .pipe(map((list: any[]): Exhibitor[] => list.map(Exhibitor.fromJSON)));
  } 

  get categories(): Observable<String[]> {
    return this.http
    .get(`${this._appUrl}/categories/`)
    .pipe(map((list: any[]): String[] => list.map(category => category.toString())))
  }

  createQuestion(question: Question) : Observable<Question> {
    return this.http.post(`${this._appUrl}/question/`, question).pipe(map(Question.fromJSON));
  }
  modifyQuestion(question) {
    return this.http.put(`${this._appUrl}/question/${question.id}`, question).pipe(map(Question.fromJSON));
  }
  deleteQuestions() {
    return this.http
      .delete(`${this._appUrl}/removequestions/`);
  }
  deleteQuestion(question){
    return this.http
      .delete(`${this._appUrl}/question/${question.id}`);
  }
}
