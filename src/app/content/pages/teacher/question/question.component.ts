import { Component, OnInit, Input } from '@angular/core';
import { Question } from './question.model';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { BACKEND_URL } from '../../../../../environments/environment';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() public question: Question;
  @ViewChild('answers', { read: ElementRef }) answers: ElementRef;
  @ViewChild('questionHeader', { read: ElementRef }) questionHeader: ElementRef;

  faAngleDown= faAngleDown;

  constructor() { }

  ngOnInit() {
  }
  expandAnswers() {
    let answersNative = this.answers.nativeElement;    

    if(answersNative.classList.contains("shown")) {
      this.answers.nativeElement.classList.remove("shown")
      this.questionHeader.nativeElement.classList.remove("questionHeaderActive")

    }
   
    else {
     this.answers.nativeElement.classList.add("shown")    
     this.questionHeader.nativeElement.classList.add("questionHeaderActive")
    }          
  }

  get imageUrl() {
    return `/API/teachers/image/${this.question.groupAnswer}`
  }
  questionType(){
    if (this.question.type == "TEXT"){
      return "Tekst";
    }
    if (this.question.type == "PHOTO"){
      return "Foto";
    }
    return this.question.type;
  }

}
