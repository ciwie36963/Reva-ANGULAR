export class Exhibitor {
    private _id: string;
    private _name: string;
    private _category: string[];
    private _coordinates: {
        xCo: number,
        yCo: number
    }

    constructor(
        name: string,
        category: string[],
    ) {
        this._name = name;
        this._category = category;
        this._coordinates = {xCo: 0, yCo: 0}        
    }

    static fromJSON(json: any): Exhibitor {
        const exhibitor = new Exhibitor(
            json.name,
            json.category,            
        );
        exhibitor._id = json._id;
        exhibitor._coordinates = json.coordinates;
        return exhibitor;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get category(): string[] {
        return this._category;
    }
    set category(category : string[]) {
        this._category = category
    }
    set id(id : string) {
        this._id = id;
    }
    setCoordinates(xCo : number,yCo: number ){        
        if (this._coordinates)
        {
            this._coordinates.xCo = xCo;
            this._coordinates.yCo = yCo;
        } else {
            this._coordinates = {xCo : xCo, yCo : yCo};
        }
    }
    get coordinates(){
        return this._coordinates;
    }

    
}