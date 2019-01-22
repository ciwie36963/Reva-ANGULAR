import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, NgForm } from '@angular/forms';
import { ErgoStudentDataService } from '../../ergo-student/ergo-student-data.service';
import { Question } from '../question/question.model';
import { HttpErrorResponse } from '@angular/common/http';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Exhibitor } from '../../admin/exhibitor/exhibitor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ErgoAdminDataService } from '../ergo-admin-data.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  @Output() public newQuestion = new EventEmitter<Question>();
  public exitstingQuestion: Question;
  private _exhibitors;
  private _questions;
  private _categories;
  public question: FormGroup;
  public errorMsg: string;

  public errors = false;
  public selectedCategory : string = ""
  public selectedExhibitor : string
  public edit = false;
  public title = "Nieuwe vraag toevoegen";
  public btnText = "Voeg vraag toe";

  constructor(
    private fb: FormBuilder,
    private _ergoAdminDataServer: ErgoAdminDataService,
    private router: Router,
    private _route: ActivatedRoute
  ) {
   }

  get answers(): FormArray {
    return <FormArray>this.question.get('answers');
  }

  get exhibitors() {
    return this._exhibitors;
  }

  get formvalue(){
    return this.question.value;
  }
  get questions() {
    return this._questions;
  }

  get categories() {
    return this._categories;
  }

  ngOnInit() {
    this.question = this.fb.group({
      questionname: ['', [Validators.required, Validators.minLength(10)]],
      answers: this.fb.array([this.createAnswers('')]),
      exhibitors: ['', Validators.required],
      type: ['TEXT',Validators.required],
      categories: ['', Validators.required]
    });
    this._route.paramMap.subscribe(parameterMap => {
      const id = parameterMap.get('id');
      if (id !== '0') {
        this.fillForm(id);
        this.title = "Vraag aanpassen"
        this.btnText = "Pas vraag aan"
      } else {
        this.setAnswerChange()
      }
    })
    this._ergoAdminDataServer.exhibitors.subscribe(
      data => {this._exhibitors = data},
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
        } while trying to retrieve exhibitors: ${error.error}`;
      }
    );
   /* this._ergoAdminDataServer.categories.subscribe(
      data => {this._categories = data},
      (error: HttpErrorResponse) => {
        this.errorMsg = `Error ${
          error.status
        } while trying to retrieve questions: ${error.error}`;
      }
    );*/


  }

  private setAnswerChange() {
    this.answers.valueChanges
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe(ingList => {
      const lastElement = ingList[ingList.length - 1];
      if (
        lastElement.answername &&
        lastElement.answername.length > 2
      ) {
        this.answers.push(this.createAnswers(''));
      } else if (ingList.length >= 2) {
        const secondToLast = ingList[ingList.length - 2];
        if (
          !lastElement.answername &&
          (!secondToLast.answername ||
            secondToLast.answername.length < 2)
        ) {
          this.answers.removeAt(this.answers.length - 1);
        }
      }
    }); 
  }

  private fillForm(id: string) {
    this.edit = true;
      this._ergoAdminDataServer.getQuestion(id).subscribe(
        data => {
          this.exitstingQuestion = data;
          this.question = this.fb.group({
            questionname: [this.exitstingQuestion.body, [Validators.required, Validators.minLength(2)]],
            answers: this.fb.array([]),
            exhibitors: this.exitstingQuestion.exhibitor.id,
            type: [this.exitstingQuestion.type, [Validators.required]],
            categories: this.exitstingQuestion.category
          });
          this.fillCategories(this.exitstingQuestion.exhibitor.id)
          //SET HUIDIGE CATEGORIE VRAAG CORRECT
          this.exitstingQuestion.answers.forEach(a => this.answers.push(this.createAnswers(a)))
          this.answers.push(this.createAnswers(''))
          this.setAnswerChange()
        },
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${
            error.status
          } while trying to retrieve question: ${error.error}`;
        }
      )
  }

  createAnswers(text: string): FormGroup {
    return this.fb.group({
      answername: [text, [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {
    let exhibitor = new Exhibitor("", new Array<string>());
    exhibitor.id = this.question.value.exhibitors;
    let category = this.question.value.categories

    const question = new Question(this.question.value.questionname, new Date(), exhibitor, this.question.value.type, category);
    
    for (const ans of this.question.value.answers.slice(0, this.question.value.answers.length -1)) {
        const answer = ans.answername;
        question.addAnswer(answer);
    }
    if (!this.edit) {
      this._ergoAdminDataServer.createQuestion(question).subscribe(
        () => {
          this.router.navigate(["/shared/list"]);
        },
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${error.status} while adding question for ${
            question.body
            }: ${error.error}`;
        }
      );
    } else {
      question.id = this.exitstingQuestion.id
      this._ergoAdminDataServer.modifyQuestion(question).subscribe(
        () => {
          this.router.navigate(["/shared/list"]);
        },
        (error: HttpErrorResponse) => {
          this.errorMsg = `Error ${error.status} while editing question for ${
            question.body
            }: ${error.error}`;
        }
      )
    }
  }

  fillCategories(value: string) {
    let ex
    this._ergoAdminDataServer.getExhibitor(value).subscribe(e => {
      this._categories = e.category;this.question.value.categories = e.category[0]; 
    })
  }
  changeCat(value : string) {
    console.log(value)
    this.selectedCategory = value;
  }
}