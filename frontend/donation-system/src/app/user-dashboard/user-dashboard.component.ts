import { Component, OnInit, ɵisSubscribable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, RouterModule, Routes, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  name: string = '';
  userId: string = '';
  shirts: number = 0;
  pants: number = 0;
  science: number = 0;
  maths: number = 0;
  donations: any = [];
  constructor(private authService: AuthService, private router: Router, private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((data) => {
      if(data.message === 'authenticated'){

        if(data.role !== 0){
          this.router.navigate(['/'],{ replaceUrl: true });
        }
        else{
          this.name = data.name;
          this.userId = data.userId;
          this.userService.getAllDonations().subscribe(data => {
            if(data.data){
              this.donations = data.data;
            }
            else{
              this.donations = [];
            }
          })
        }
      }
    }, err => {
      console.log('Auth error', err);
    })
  }

  logout(){
    this.authService.logout();
  }

  public showNotification( type: string, message: string ): void {
    if(type === 'success'){
      this.toastr.success( type, message);
    }
    else{
      this.toastr.error( type, message);
    }
	}

  increase(item: string){
    if(item === 'shirts'){
      this.shirts ++;
    }
    else if(item === 'pants'){
      this.pants ++;
    }
    else if(item === 'science'){
      this.science ++;
    }
    else if(item === 'maths'){
      this.maths ++;
    }
  }

  decrease(item: string){
    if(item === 'shirts'){
      this.shirts > 0 ? this.shirts -- : this.shirts = 0;
    }
    else if(item === 'pants'){
      this.pants > 0 ? this.pants -- : this.pants = 0;
    }
    else if(item === 'science'){
      this.science > 0 ? this.science -- : this.science = 0;
    }
    else if(item === 'maths'){
      this.maths > 0 ? this.maths -- : this.maths = 0;
    }
  }

  donate(){
    let donation: any = [];
    if(this.shirts > 0){
      donation.push({itemType: 1, itemSubType: 1, quantity: this.shirts});
    }
    if(this.pants > 0){
      donation.push({itemType: 1, itemSubType: 2, quantity: this.pants});
    }
    if(this.science > 0){
      donation.push({itemType: 2, itemSubType: 3, quantity: this.science});
    }
    if(this.maths > 0){
      donation.push({itemType: 2, itemSubType: 4, quantity: this.maths});
    }
    this.userService.donate(donation, this.userId).subscribe(data => {
      console.log('data',data)
      if(data.data){
        data.data['userId'] = {name: this.name};
        this.donations.unshift(data.data);
        console.log('donations', this.donations)
        this.shirts = 0;
        this.pants = 0;
        this.science = 0;
        this.maths = 0;
        this.showNotification('success', 'Donated successfully');
      }
      else{
        this.showNotification('error', 'Donation failed');
      }
    })
  }

  totalQuantity(donation: any){
    let total = 0;
    for(let i of donation.items){
      total = total + i.quantity;
    }
    return total;
  }

  getItemType(a: any){
    if(a?.item?.itemSubType === 1){
      return 'Shirts';
    }
    else if(a?.item?.itemSubType === 2){
      return 'Pants';
    }
    else if(a?.item?.itemSubType === 3){
      return 'Science Books';
    }
    else if(a?.item?.itemSubType === 4){
      return 'Math Books';
    }
    else{
      return '';
    }

  }

}
