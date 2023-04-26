import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/Services/address/address.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  ctryId:string = ""
  govId:string = ""
  Countries:any = []
  Govs:any = []
  Cities:any = []
  isdefault = false
  addressForm:FormGroup;
  countryname = "[A-Za-z]{1,20}";
  constructor(
    private addserve:AddressService,
    public fb: FormBuilder,
    private router:Router,
    private toastr: ToastrService,
    ) {
      this.addressForm= this.fb.group({
        country:['',[Validators.required]],
        fullName:['',[Validators.required]],
        phone:['',[Validators.required]],
        governate:['',[Validators.required]],
        details:['',[Validators.required]],
        city:['',[Validators.required]]
      })
    }

  ngOnInit(): void {
    this.addserve.getCountries().subscribe(countries=> {
      console.log("countries", countries)
      this.Countries = countries.map(country=>country)
    })
  }
  onChangeCountry(event:any) {
    const countryName = event.target.value
    console.log(countryName)
    if (countryName) {
      this.addserve.getGovs(countryName).subscribe(
        data => {
          this.Govs = data;
          this.Cities = null;
        }
      );
    } else {
      this.Govs = null;
      this.Cities = null;
    }
  }
  onChangeGov(event:any) {
    const govId = event.target.value
    console.log(event.target.value)
    if (govId) {
      this.addserve.getCities(govId).subscribe(        
        data => {
          console.log(govId)
          this.Cities = data;
        }
      );
    } else {
      this.Cities = null;
    }
  }
  addAddress(){
    this.addserve.addAddresses(this.addressForm.value).subscribe(data=>{
      this.toastr.success('Address was added successfully..');
      this.router.navigate(['/payment'])
    })
  }

}
