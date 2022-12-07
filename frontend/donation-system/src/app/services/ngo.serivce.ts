import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { AllItemsData, RequestData, AllRequestsData, AllMyItemsData } from '../interfaces/ngo.interface';

@Injectable({
    providedIn: 'root'
})

export class NGOService {
    serverURL = environment.serverURL;
    constructor(private http: HttpClient){

    }

    getAllItems(){
        return this.http.get<AllItemsData>(this.serverURL+'/getallitems');
    }

    sendRequest(reqObj: any){
        return this.http.post<RequestData>(this.serverURL+'/sendrequest', reqObj);
    }
    
    getAllRequests(userId: string){
        return this.http.get<AllRequestsData>(this.serverURL+'/'+userId+'/getallrequests');
    }

    getAllMyItems(userId: string){
        return this.http.get<AllMyItemsData>(this.serverURL+'/'+userId+'/getallmyitems');
    }
}