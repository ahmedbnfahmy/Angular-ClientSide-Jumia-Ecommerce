import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iuser } from 'src/app/Models/iuser';
import { LocalStorgeService } from 'src/app/Services/localStorge/local-storge.service';
import { AcountuserService } from 'src/app/Services/user/acountuser.service';
import { UserAuthService } from 'src/app/Services/user/user-auth.service';

@Component({
  selector: 'app-editaccount',
  templateUrl: './editaccount.component.html',
  styleUrls: ['./editaccount.component.scss']
})
export class EditaccountComponent {






  User: Iuser = {};
  UserID: any;
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
  }





  changeName(val: string, valid: any, btn: any) {
    if (val.length < 4) {
      valid.classList.remove('d-none');
      valid.classList.add('d-block');
    } else {
      this.User.name = val;
      valid.classList.remove('d-block');
      valid.classList.add('d-none');
    }
  }



  validDataPhone(phone: string) {
    const re = /^01[0-2]\d{1,8}$/;
    return re.test(phone);
  }
  changePhone(val: string, valid: any) {
    let ChValid = this.validDataPhone(val);
    if (ChValid) {
      this.User.phone = val;

      valid.classList.remove('d-block');
      valid.classList.add('d-none');
    } else {
      valid.classList.remove('d-none');
      valid.classList.add('d-block');
    }
  }

  validDataPassword(str:string)
  {

    var re = /(?=.*[A-Z])(?=.[a-z])(?=.*[0-9]).{6,20}/;
    return re.test(str);
  }

  changePassword(val: string, valid: any) {
    let ChValid = this.validDataPassword(val);
      console.log(ChValid);
    if (ChValid) {
    this.User.password = val;

    this.checkPassword = true;
    valid.classList.remove('d-block');
    valid.classList.add('d-none');
  } else {
    valid.classList.remove('d-none');
    valid.classList.add('d-block');
  }
}

  changeAlldate() {
    if (this.checkPassword) {
      let sub3 = this.accountservices
        .updateUser(this.UserID, this.User)
        .subscribe((data) => {
          console.log('data after check password', data);
          localStorage.removeItem('user')
          localStorage.setItem('user', JSON.stringify(data))
          this.storageService.removeItem('name')
          this.storageService.setItem('name',data.name)
          const name = data.name
          this.userService.userNameStore.next(name as string);
          this.router.navigate(['/User/login'])
        });
      this.subscriptions.push(sub3);
    } else {
      this.data = {
        name: this.User.name,
        phone: this.User.phone,
        email: this.User.email,
      };
      let sub4 = this.accountservices
        .updateUser(this.UserID, this.data)
        .subscribe((data) => {
          console.log('date if not checkpassword..', data);
          localStorage.removeItem('user')
          localStorage.setItem('user', JSON.stringify(data))
          const name = data.name
          this.userService.userNameStore.next(name as string);
          this.storageService.removeItem('name')
          this.storageService.setItem('name',data.name)
          this.router.navigate(['/User/login'])
        });

      this.subscriptions.push(sub4);
    }
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) sub.unsubscribe();
  }

}


