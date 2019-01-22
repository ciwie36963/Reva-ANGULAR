import { Exhibitor } from "../../admin/exhibitor/exhibitor.model";

export class Question {

   
    private _id: string;
    private _body: string;
    private _answers: string[];
    private _posted: Date;
    private _exhibitor : Exhibitor;
    private _groupAnswer : string;
    private _type: string;
    private _groupName: string;
    private _groupId: string;
    private _category : string;

    constructor(body: string, answers: string[], posted: Date, exhibitor : Exhibitor, type:string, category : string) {
        this._body = body;
        this._answers = answers;
        this._posted = posted;
        this._exhibitor = exhibitor;
        this._type = type;
        this._category = category
    }

    static fromJSON(json: any): Question {
        const question = new Question(
            json.body,
            json.possibleAnswers,
            json.posted,
            json.exhibitor,
            json.type,
            json.category
        );
        question._id = json._id;
        return question;
    }
    static fromJSONGroup(json: any) : Question {
    
        const question = new Question(
            json.body,
            json.possibleAnswers,
            json.posted,
            json.exhibitor,
            json.type,
            json.category
        );
        question._id = json._id;
        question._groupAnswer = json.answer.answer;
        question._groupName = json.group.name;
        question._groupId = json.group.id;
        
        
        return question;
    }

    get id(): string {
        return this._id;
    }

    get body(): string {
        return this._body;
    }
    get answers(): string[] {
        return this._answers;
    }
    get groupName(): string{
        return this._groupName;
    }
    get posted(): Date {
        return this._posted;
    }
    get exhibitor() : Exhibitor {
        return this._exhibitor;
    }
    get groupId(): string{
        return this._groupId;
    }
    get type(): string{
        return this._type;
    }
    get groupAnswer() : string {
        return this._groupAnswer;
    }
    get category() : string {
        return this._category;
    }
}