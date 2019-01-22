import { Exhibitor } from "../../admin/exhibitor/exhibitor.model";

export class Question {

   
    private _id: string;
    private _body: string;
    private _answers: string[];
    private _posted: Date;
    private _type: string;
    private _exhibitor : Exhibitor;
    private _category : string;
    

    constructor(body: string, posted: Date, exhibitor : Exhibitor, type: string, category : string) {
        this._body = body;
        this._posted = posted;
        this._exhibitor = exhibitor;
        this._answers = [];
        this._type = type;
        this._category = category
    }

    static fromJSON(json: any): Question {
        const question = new Question(
            json.body,
            json.posted,
            Exhibitor.fromJSON(json.exhibitor),
            json.type,
            json.category
        );
        question._answers = json.possibleAnswers;
        question._id = json._id;
        return question;
    }

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    get body(): string {
        return this._body;
    }

    get answers(): string[] {
        return this._answers;
    }
    get posted(): Date {
        return this._posted;
    }
    get type() : string {
        return this._type;
    }
    get category() : string {
        return this._category
    }
    get exhibitor() : Exhibitor {
        return this._exhibitor;
    }
    addAnswer(answer: string) {
        this._answers.push(answer);
      }
}