import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { DonationData, AllDonationsData } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    serverURL = environment.serverURL;
    constructor(private http: HttpClient){

    }

    getAllDonations(){
        return this.http.get<AllDonationsData>(this.serverURL+'/getalldonations');
    }

    donate(donation: any, userId: string){
        return this.http.post<DonationData>(this.serverURL+'/donate', {donation, userId});
    }
}