import { Question } from "../question/question.model";

export class Answer {

   
    private _question : Question;
    private _groupAnswer : string;

    constructor(groupAnswer, question) {
        this._question = question;
        this._groupAnswer = groupAnswer;
    }

    static fromJSON(json: any): Answer {
        const answer = new Answer(
          json.answer,
          Question.fromJSON(json.question)
        );
        return answer;
    }

    get answer() {
        return this._groupAnswer;
    }
    get question() {
        return this._question;
    }

}