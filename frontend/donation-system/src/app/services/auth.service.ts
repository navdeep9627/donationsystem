import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthData, LoginData, RegisterData } from '../interfaces/auth.interface';
import { ActivatedRoute, RouterModule, Routes, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    serverURL = environment.serverURL;
    constructor(private http: HttpClient, private router: Router){

    }

    register(postObj: any){
        return this.http.post<RegisterData>(this.serverURL+'/register', postObj);
    }

    login(postObj: any){
        return this.http.post<LoginData>(this.serverURL+'/login', postObj);
    }

    isAuthenticated(){
        return this.http.get<AuthData>(this.serverURL+'/isauthenticated');
    }

    logout(){
        localStorage.removeItem('token');
        this.router.navigate(['/'], {replaceUrl: true})
    }
}
