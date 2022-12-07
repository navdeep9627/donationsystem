import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute, RouterModule, Routes, Router } from '@angular/router';
import { NGOService } from '../services/ngo.serivce';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  name: string = '';
  userId: string = '';
  requests: any = [];
  items: any;
  constructor(private authService: AuthService, private router: Router, private adminService: AdminService, private toastr: ToastrService, private ngoService: NGOService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((data) => {
      if(data.message === 'authenticated'){
        if(data.role !== 2){
          this.router.navigate(['/'],{ replaceUrl: true });
        }
        else{
          this.name = data.name;
          this.userId = data.userId;
          this.adminService.getAllRequests().subscribe((data) => {
            if(data.status === 'success'){
              this.requests = data.requests;
              console.log(this.requests)
            }
          })
          this.ngoService.getAllItems().subscribe(data => {
            if(data.data){
              console.log('data',data)
              this.items = data.data;
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

  approve(req: any) {
    console.log(req)
    const totalQnty = this.items.find((e: any) => {return e?._id === req?.itemId?._id})?.netQuantity;
    const qnty = totalQnty - req.reqQuantity;
    console.log(totalQnty, req.reqQuantity, qnty)
    if(qnty >= 0){
      this.adminService.approveReq(req._id).subscribe(data => {
        if(data.message){
          this.toastr.success('Request approved successfully')
          let item = this.items.find((e: any) => {return e?._id === req.itemId?._id});
          item.netQuantity = qnty;
          req.status = 1;
        }
        else{
          this.toastr.error('Request approval failed')
        }
      })  
    }
    else{
      this.toastr.error('Requested quantity can not be more than the total available quantity')
    }
  }

  reject(req: any) {
    this.adminService.rejectReq(req._id).subscribe(data => {
      if(data.message){
        this.toastr.success('Request rejected successfully')
        req.status = 2;
      }
      else{
        this.toastr.error('Request rejection failed')
      }
    })
  }

}
