export class User {
    private _name : string;
    private _id : string;
    private _avatar : string;
    private _role : string;
    private _email : string;
    constructor(id : string, name : string, email : string, role: string) {
        this._id =id;
        this._name = name;
        this._email = email;
        this._role = role;
    }
    get id() : string {
        return this._id;
    }
    get name() : string {
        return this._name;
    }
    get email() : string {
        return this._email;
    }
    get role() : string {
        return this._role
    }
    static fromJSON(json: any): User {
        const user = new User(
          json._id,
          json.name,
          json.email,
          json.role

        );
        return user;
      }
}