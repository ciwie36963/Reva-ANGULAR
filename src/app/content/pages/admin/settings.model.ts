
export class Settings {
    private _studentCode: string;
    private _teacherCode: string;
    private _expoDate: Date;

    constructor(
        studentCode: string,
        teacherCode: string,
        expoDate: Date

    ) {
        this._studentCode = studentCode;
        this._teacherCode = teacherCode;
        this._expoDate = expoDate;
    }

    static fromJSON(json: any): Settings {

        const settings = new Settings(
            json.studentCode,
            json.teacherCode,
            json.expoDate
        );

        return settings;
    }


    get studentCode(): string {
        return this._studentCode;
    }
    get expoDate(): Date {
        return this._expoDate;
    }
    get teacherCode(): string {
        return this._teacherCode;
    }

    set studentCode(code: string) {
        this._studentCode = code;
    }
    set teacherCode(code: string) {
        this._teacherCode = code;
    }
    set expoDate(date: Date) {
        this._expoDate = date;
    }
}
