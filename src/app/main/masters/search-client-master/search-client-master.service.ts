import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigurationSettings } from '@core/models/configuration';
import { APIService } from '@core/services/apiService';
import { UserProfileService } from '@core/services/user-profile.service';


@Injectable()
export class SearchClientMasterService {
    urlClientMasterDetails: string = "Client/ManualGeneration";
  urlEmployeeMasterDetails: string = "Client";

    constructor(
        private apiService: APIService,
    ) { }


    GetClientDetails() {
        //return this.apiService.getData(this.urlEmployeeMasterDetails + "?Fname=" + Fname + "&Lname=" + Lname + "&EmailId=" + EmailId);
        return this.apiService.getData(this.urlEmployeeMasterDetails);
    
      }
}
