import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigurationSettings } from '@core/models/configuration';
import { APIService } from '@core/services/apiService';
import { UserProfileService } from '@core/services/user-profile.service';
import { ClientProfileMaster } from 'app/shared/Models/Admin/ClientMaster';
import { ClientMasterComponent } from './client-master.component';


@Injectable()
export class ClientMasterService {
    urlClientMasterDetails: string = "Client/ManualGeneration";
    constructor(
        private apiService: APIService,
        private userProfileService: UserProfileService,
    ) { }


    SaveClientProfileMaster(ClientDetails: ClientProfileMaster) {
        ClientDetails.Action = "";
        ClientDetails.AddedDate = new Date(Date.now());
        ClientDetails.UpdatedDate = new Date(Date.now());
        return this.apiService.postData(this.urlClientMasterDetails, ClientDetails);
    }
}
