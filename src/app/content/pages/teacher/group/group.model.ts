import { Question } from "../question/question.model";
import { Answer } from "../group-detail/Answer.model";

export class Group {
    private _id : String;
    private _code : String;
    private _name : String;
    private _imageString : String;
    private _questions : String;
    private _description: String;
    get id() {
        return this._id;
    }
    get code() {
        return this._code;
    }
    get name() {
        return this._name;
    }
    get description(){
        return this._description;
    }
    get imageString() {
        return this._imageString;
    }
    get questions() {
        return this._questions;
    }
    static fromJSON(json: any): Group {
        const group = new Group();
        group._id = json._id;
        group._code = json.code.toUpperCase();
        group._name = json.name;
        group._imageString = json.imageString;
        group._description = json.description
        
        if(json.answers)
            group._questions = json.answers.map(Answer.fromJSON);
        return group;
    }
}