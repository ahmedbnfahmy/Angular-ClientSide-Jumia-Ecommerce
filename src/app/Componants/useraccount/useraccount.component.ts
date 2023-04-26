import { Component } from '@angular/core';
import { UserAuthService } from 'src/app/Services/user/user-auth.service';

@Component({
  selector: 'app-useraccount',
  templateUrl: './useraccount.component.html',
  styleUrls: ['./useraccount.component.scss']
})
export class UseraccountComponent {

  constructor(private userAuth:UserAuthService){

  }

  logOut(){

    this.userAuth.Logout()
  }

}
