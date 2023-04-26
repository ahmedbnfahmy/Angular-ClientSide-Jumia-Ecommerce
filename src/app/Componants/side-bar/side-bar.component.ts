import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  currentLang: string;

  constructor(
    public router: Router  , public translate:TranslateService
  ) {    this.currentLang=localStorage.getItem('current_lang')||'en';
  this.translate.use(this.currentLang) }
  changeCurrentLang(lang:string){
    this.translate.use(lang);
    localStorage.setItem('current_lang',lang);
    
    this.currentLang=lang;

    window.location.reload()

}

}
