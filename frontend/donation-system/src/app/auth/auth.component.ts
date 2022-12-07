import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, RouterModule, Routes, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });
  registerForm = new FormGroup({
    email: new FormControl(),
    name: new FormControl(),
    password: new FormControl(),
    repeatPass: new FormControl(),
    check: new FormControl()
  });
  loginRole: number = 0;
  regRole: number = 0;
  userTypeLogin: string = 'User';
  userTypeRegister: string = 'User';
  name: string = '';
  
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((data) => {
      if(data.message === 'authenticated'){
        if(data.role === 0){
          this.router.navigate(['/user-dashboard'],{ replaceUrl: true });
        }
        else if(data.role === 1){
          this.router.navigate(['/ngo-dashboard'],{ replaceUrl: true });
        }
        else if(data.role === 2){
          this.router.navigate(['/admin-dashboard'],{ replaceUrl: true });
        }
      }
    }, err => {
      console.log('Auth error', err);
    })
  }

  public showNotification( type: string, message: string ): void {
    console.log(type, message)
    if(type === 'success'){
      this.toastr.success( type, message);
    }
    else{
      this.toastr.error( type, message);
    }
	}

  login(){
    let postObj: any = {};
    postObj['email'] = this.loginForm.value.email;
    postObj['password'] = this.loginForm.value.password;
    console.log('postObj', postObj)
    if(postObj['email'] && postObj['password']){
      this.authService.login(postObj).subscribe(data => {
        if(data['message'] === 'authenticated'){
          localStorage.setItem('token', data['token']);
          console.log('localStorage', localStorage.getItem('token'))  
          if(data.role === 0){
            this.router.navigate(['/user-dashboard'],{ replaceUrl: true });
          }
          else if(data.role === 1){
            this.router.navigate(['/ngo-dashboard'],{ replaceUrl: true });
          }
          else if(data.role === 2){
            this.router.navigate(['/admin-dashboard'],{ replaceUrl: true });
          }
        }
        else{
          this.showNotification('error', 'User login failed');
        }
      }, err => {
        console.log('Login error', err);
        this.showNotification('error', 'User login failed');
      });
    }
    else{
      this.showNotification('error', 'Please enter email & password');
    }
  }

  register(){
    let registerObj: any = {};
    registerObj['email'] = this.registerForm.value.email;
    registerObj['password'] = this.registerForm.value.password;
    registerObj['role'] = this.regRole;
    registerObj['name'] = this.registerForm.value.name;
    console.log('registerObj', registerObj, this.registerForm.value.check, this.registerForm.value.repeatPass)
    if(!this.registerForm.value.email || !this.registerForm.value.name){
      this.showNotification('error', 'Please all the required fileds');
      return;
    }
    if(!this.registerForm.value.check){
      this.showNotification('error', 'Please accept the terms & conditions');
      return;
    }
    if(this.registerForm.value.repeatPass !== this.registerForm.value.password){
      this.showNotification('error', 'Password not matched');
      return;
    }
    if(registerObj['email'] && registerObj['password'] && registerObj['name']){
      this.authService.register(registerObj).subscribe(data => {
        if(data['status'] === 'success'){
          console.log('User registered successfully');
          this.showNotification('success', 'User registered successfully')
          this.registerForm.value.email = '';
          this.registerForm.value.password = '';
          this.regRole = 0;
          this.registerForm.value.name = 0;
          this.registerForm.value.repeatPass = '';
        }
        else if(data['status'] === 'failure'){
          this.showNotification('error', data['message']);
        }
        else{
          this.showNotification('error', 'User registration failed')
        }
      }, err => {
        console.log('Registration error', err);
        this.showNotification('error', 'User registration failed')
      }); 
    }
  }

  setLoginUser(user: string){
    if(user === 'User'){
      this.userTypeLogin = 'User';
      this.loginRole = 0;
    }
    else if(user === 'NGO'){
      this.userTypeLogin = 'NGO';
      this.loginRole = 1;
    }
    else if(user === 'Admin'){
      this.userTypeLogin = 'Admin';
      this.loginRole = 2;
    }
  }

  setRegisterUser(user: string){
    if(user === 'User'){
      this.userTypeRegister = 'User';
      this.regRole = 0;
    }
    else if(user === 'NGO'){
      this.userTypeRegister = 'NGO';
      this.regRole = 1;
    }
    else if(user === 'Admin'){
      this.userTypeRegister = 'Admin';
      this.regRole = 2;
    }
  }


}
