import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, RouterModule, Routes, Router } from '@angular/router';
import { NGOService } from '../services/ngo.serivce';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ngo-dashboard',
  templateUrl: './ngo-dashboard.component.html',
  styleUrls: ['./ngo-dashboard.component.css']
})
export class NgoDashboardComponent implements OnInit {
  name: string = '';
  userId: string = '';
  shirts: number = 0;
  pants: number = 0;
  science: number = 0;
  maths: number = 0;
  items: any;
  requests: any;
  myItems: any;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService, private ngoService: NGOService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((data) => {
      if(data.message === 'authenticated'){
        if(data.role !== 1){
          this.router.navigate(['/'],{ replaceUrl: true });
        }
        else{
          this.name = data.name;
          this.userId = data.userId;
          this.ngoService.getAllItems().subscribe(data => {
            if(data.data){
              console.log('data',data)
              this.items = data.data;
            }
          })
          this.ngoService.getAllRequests(this.userId).subscribe(data => {
            if(data.requests){
              this.requests = data.requests;
            }
          });
          this.ngoService.getAllMyItems(this.userId).subscribe(data => {
            if(data.data){
              this.myItems = data.data;
            } 
          });
        }
      }
    }, err => {
      console.log('Auth error', err);
    })

  }

  logout(){
    this.authService.logout();
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

  getQuantity(type: string){
    if(this.items && this.items.length){
      for(let item of this.items){
        if(item?.itemSubType === 1 && type === 'shirts'){
          return item?.netQuantity ? item?.netQuantity : 0;
        }
        else if(item?.itemSubType === 2 && type === 'pants'){
          return item?.netQuantity ? item?.netQuantity: 0;
        }
        else if(item?.itemSubType === 3 && type === 'science'){
          return item?.netQuantity ? item?.netQuantity: 0;
        }
        else if(item?.itemSubType === 4 && type === 'maths'){
          return item?.netQuantity ? item?.netQuantity: 0;
        }  
      }  
    }
    else{
      return 0;
    }
  }

  getQuantityMyItems(type: string){
    if(this.myItems && this.myItems.length){
      for(let item of this.myItems){
        if(item?.item[0]?.itemSubType === 1 && type === 'shirts'){
          return item?.reqQuantity ? item?.reqQuantity: 0;
        }
        else if(item?.item[0]?.itemSubType === 2 && type === 'pants'){
          return item?.reqQuantity ? item?.reqQuantity: 0;
        }
        else if(item?.item[0]?.itemSubType === 3 && type === 'science'){
          return item?.reqQuantity ? item?.reqQuantity: 0;
        }
        else if(item?.item[0]?.itemSubType === 4 && type === 'maths'){
          return item?.reqQuantity ? item?.reqQuantity: 0;
        }  
      }  
    }
    else{
      return 0;
    }
  }


  sendRequest(type: string){
    const reqObj: any = {
      userId: this.userId,
      status: 0
    }
    let item: any;
    if(type === 'shirts'){
      item = this.items.find((e: any) => {return e.itemSubType === 1});
      reqObj.itemId = item?._id;
      reqObj.reqQuantity = this.shirts;
    }
    else if(type === 'pants'){
      item = this.items.find((e: any) => {return e.itemSubType === 2});
      reqObj.itemId = item?._id;
      reqObj.reqQuantity = this.pants;
    }
    else if(type === 'science'){
      item = this.items.find((e: any) => {return e.itemSubType === 3});
      reqObj.itemId = item?._id;
      reqObj.reqQuantity = this.science;
    }
    else if(type === 'maths'){
      item = this.items.find((e: any) => {return e.itemSubType === 4});
      reqObj.itemId = item?._id;
      reqObj.reqQuantity = this.maths;
    } 
    if(item.netQuantity - reqObj.reqQuantity >= 0){
      this.ngoService.sendRequest({request: reqObj}).subscribe(data => {
        if(data.data){
          this.requests.unshift(data.data);
          // item.netQuantity = item.netQuantity - data.data?.reqQuantity;
          this.shirts = 0; this.pants = 0; this.science = 0; this.maths = 0;
          this.toastr.success('Request created successfully');
        }
      });  
    }
    else{
      this.toastr.error('Requested quantity can not be more than available quantity');
    }
  }

  getItemType(a: any){
    if(a?.itemId?.itemSubType === 1){
      return 'Shirts';
    }
    else if(a?.itemId?.itemSubType === 2){
      return 'Pants';
    }
    else if(a?.itemId?.itemSubType === 3){
      return 'Science Books';
    }
    else if(a?.itemId?.itemSubType === 4){
      return 'Math Books';
    }
    else{
      return '';
    }
  }


}
