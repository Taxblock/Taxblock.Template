import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';


import { DataTablesModule } from 'angular-datatables';
import { ClientMasterComponent } from './client-master/client-master.component';
import { ClientMasterService } from './client-master/client-master.component.service';
import { SearchClientMasterComponent } from './search-client-master/search-client-master.component';
import { ClientDetails } from 'app/shared/Models/Masters/employeeDetails.model';
import { SearchClientMasterService } from './search-client-master/search-client-master.service';



// routing
const routes: Routes = [
  {
    path: 'client-master',
    component: ClientMasterComponent, 
    data: { animation: 'auth' }
  }, 
  {
    path: 'search-client',
    component: SearchClientMasterComponent, 
    data: { animation: 'auth' }
  }, 
];

@NgModule({
  declarations: [ClientMasterComponent,SearchClientMasterComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, FormsModule, ReactiveFormsModule, CoreCommonModule,DataTablesModule,],
  providers:[ClientMasterService,ClientDetails,SearchClientMasterService]
})
export class MastersModule {} 
 