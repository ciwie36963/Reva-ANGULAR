import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from '../question/question.model';
import { ErgoStudentDataService } from '../../ergo-student/ergo-student-data.service';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ErgoAdminDataService } from '../ergo-admin-data.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  // attributes
  public filterQuestionName: string;
  public filterQuestion$ = new Subject<string>();
  public errorMsg: string;
  private _questions: Question[];


  constructor(private _ergoAdminDataService: ErgoAdminDataService) {
    this.filterQuestion$
      .pipe(
        distinctUntilChanged(),
        debounceTime(400),
        map(val => val.toLowerCase())
      )
      .subscribe(val => (this.filterQuestionName = val));
  }

  ngOnInit(): void {
    this._ergoAdminDataService.questions.subscribe(
      questions => {this._questions = questions; 
      },
      (error: HttpErrorResponse) => {
        this.errorMsg = `Er is een fout opgetreden bij het laden van de vragen`;
      }
    );
  }

  removeQuestion(question : Question) {
   this._ergoAdminDataService.deleteQuestion(question).subscribe(
     item => (this._questions = this._questions.filter(val => question.id !== val.id)),
     (error: HttpErrorResponse) => {
       this.errorMsg = `Er is een fout opgetreden bij het verwijderen van de vraag`;
     }
   );
  }

  modifyQuestion(question : Question) {
   this._ergoAdminDataService.modifyQuestion(question).subscribe(
     item => (this._questions = this._questions.filter(val => question.id !== val.id)),
     (error: HttpErrorResponse) => {
       this.errorMsg = `Er is een fout opgetreden bij het wijzigen van de vraag`;
     }
   );
  }

  get questions() {
    return this._questions;
  }
}
