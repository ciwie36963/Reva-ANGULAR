import { Pipe, PipeTransform } from '@angular/core';
import { Question } from './question/question.model';

@Pipe({
  name: 'questionFilter',
  pure: false
})
export class QuestionFilterPipe implements PipeTransform {
  
  transform(questions: Question[], body: string): Question[] {
    if (!body || body.length === 0) {
      return questions;
    }
    return questions.filter(question =>
      question.body.toLowerCase().includes(body.toLowerCase())
    );
  }
}