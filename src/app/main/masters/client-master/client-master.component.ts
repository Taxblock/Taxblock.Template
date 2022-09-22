import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ResponseCode } from "@core/models/responseObject.model";
import { ClientProfileMaster } from 'app/shared/Models/Admin/ClientMaster';
import { ClientMasterService } from './client-master.component.service';


@Component({
  selector: 'app-client-master',
  templateUrl: './client-master.component.html',
  styleUrls: ['./client-master.component.scss']
})
export class ClientMasterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private clientmasterservice:ClientMasterService) {

  }
  clientMasterForm: FormGroup;
  clientMaster_Form: any;
  countryMasterList: Array<ClientProfileMaster>;
  submitted = false;
  ngOnInit(): void {
    this.CreateForm();
  }
  CreateForm() {
    this.clientMasterForm = this.formBuilder.group({      
    UserId: [0,],
    ClientProfileId:[0,],
    ProfileTypeId:[0,],
    FName : ['',],
    MName : ['',],
    LName : ['',],
    DOB : ['',],
    Gender : ['',],
    PANNo : ['',],
    CompanyName : ['',],
    CompanyUrl : ['',],
    CompanyPan : ['',],
    CompanyTan : ['',],
    Officialwebsite : ['',],
    AAdharNo : ['',],
    EmailId : ['',],
    MobileNo : ['',],
    PhoneNo : ['',],
    ProfileTag : ['',],
    IsActive :  ['',],
    IsPrimary :  ['',],
    CorporateName : ['',],
    PasswordHash : ['',],
    AddedBy :['', [Validators.required],Validators.pattern("^[0-9]*$")],
    AddedDate :['',],
    UpdatedBy :['', [Validators.required],Validators.pattern("^[0-9]*$")],
    UpdatedDate : ['',],
    Action : ['',],
    });
    this.clientMaster_Form = this.clientMasterForm.controls;
  }
  OnSaveClientMaster() {
    this.submitted = true;
    let clientData =  new ClientProfileMaster();  
   {
      clientData = this.clientMasterForm.value;
      clientData.DOB=  new Date
      clientData.AddedDate=  new Date
      clientData.UpdatedDate=  new Date
      this.clientmasterservice.SaveClientProfileMaster(clientData).subscribe(
        (result: any) => {
          result.Value;      

        },
        (error:any) => {
          //this.alertService.ShowError(error,"Failed to save due to unknown error.");
        }
      );
    }    
  }
   
  }

