import { Injectable } from '@angular/core';


@Injectable({providedIn:'root'})
export class StateService {

    constructor() { }

    public SetData(key: string, data: any) {
        localStorage[key] = JSON.stringify(data);
    }

    public getData(key: string) {
        let data = localStorage[key];
        if (data != null) {
            return JSON.parse(data);
        }
        else {
            return null;
        }
    }

}


