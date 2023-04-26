import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { Iuser } from 'src/app/Models/iuser';
import { UserAuthService } from 'src/app/Services/user/user-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user1: Iuser
  
  form: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  currentLang:string;
  constructor(private fb: FormBuilder, private toastr: ToastrService, private authService: UserAuthService, public translate:TranslateService) {
    this.currentLang=localStorage.getItem('current_lang')||'en';
    this.translate.use(this.currentLang)
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    })

    this.user1 = {
      email: "",
      password: ""
    }
  }

  login(email: string, pass: string): void {
    this.user1.email = email
    this.user1.password = pass
    const _user = this.authService.signIn(this.user1)
    if (_user?.name) {
      this.toastr.success('Hello, again' + _user?.name, '', {
        positionClass: 'toast-top-left'
      });
    }
  }






  showPassword = false;
  togglePassword() {
    this.showPassword = !this.showPassword

  }
}
