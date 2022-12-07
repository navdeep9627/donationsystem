import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestData, AppRejData } from '../interfaces/admin.interface';

@Injectable({
    providedIn: 'root'
})

export class AdminService {
    serverURL = environment.serverURL;
    constructor(private http: HttpClient){

    }

    getAllRequests(){
        return this.http.get<RequestData>(this.serverURL+'/getallrequestsadmin');
    }

    approveReq(reqId: string){
        return this.http.get<AppRejData>(this.serverURL+'/'+reqId+'/approvereq');
    }

    rejectReq(reqId: string){
        return this.http.get<AppRejData>(this.serverURL+'/'+reqId+'/rejectreq');
    }

}