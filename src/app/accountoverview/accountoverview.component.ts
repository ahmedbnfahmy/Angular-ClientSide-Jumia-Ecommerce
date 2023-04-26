import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Iuser } from '../Models/iuser';
import { UserAuthService } from '../Services/user/user-auth.service';
import { AcountuserService } from '../Services/user/acountuser.service';
import { LocalStorgeService } from '../Services/localStorge/local-storge.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accountoverview',
  templateUrl: './accountoverview.component.html',
  styleUrls: ['./accountoverview.component.scss']
})
export class AccountoverviewComponent  implements OnInit{

  User: Iuser = {};
  UserID: any;
  userAddress:any
  data: any;
  userName = ''
  checkPassword: boolean = false;
  checkEmailData: boolean = false;
  public subscriptions: Subscription[] = [];

  constructor(
    private userService: UserAuthService,

    private accountservices:AcountuserService,
    public router:Router,
    private storageService:LocalStorgeService
  ){}
  ngOnInit(): void {
    let sub1 = this.userService.userName$.subscribe((userName) => {
      const user = JSON.parse(localStorage.getItem('user') as string);
      this.UserID = user._id;
      console.log("UserID",this.UserID , user._id);
    });

    this.subscriptions.push(sub1);

    let sub2 = this.accountservices.getUserByID(this.UserID).subscribe((user) => {

      this.User = user;
      console.log('succeessfuly', user);
    });

    this.subscriptions.push(sub2);


    this.accountservices.getUserAddByID().subscribe(data=>{
      this.userAddress=data[0]
      console.log(this.userAddress);
      
    })
  }





 

}
