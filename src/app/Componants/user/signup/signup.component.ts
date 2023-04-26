import { Component } from '@angular/core';
import { UserAuthService } from 'src/app/Services/user/user-auth.service';
import { Iuser } from 'src/app/Models/iuser';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  user1: Iuser


  form: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  // phonePattern = "[0-9]";
  namePattern = "[A-Za-z]{3,30}";
  passwordPattern = "^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.[*.!@$%^&(){}[]:;,.?/~_+-=|\]).{8,32}$";
  number = "(01)[0-9]{9}";
  currentLang: string;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private authService: UserAuthService,
    private router: Router,
    public translate:TranslateService,
    ) { this.currentLang=localStorage.getItem('current_lang')||'en';
    this.translate.use(this.currentLang)
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      phone: ['', [Validators.required, Validators.pattern(this.number)]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    })

    this.user1 = {
      name: "",
      email: "",
      phone: "",
      password: ""
    }
  }

  signup(name: string, email: string, pass: string, phone: string): void {

    this.user1.name = name
    this.user1.email = email
    this.user1.password = pass
    this.user1.phone = phone

    this.authService.signup(this.user1).subscribe(data => {

      this.toastr.success(`${this.user1.name}, Your're Signup Successfully..`);
      this.router.navigate(["User/login"])

    }, (err) => {
      this.toastr.error(err);

    })
  }


}
