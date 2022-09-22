import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreDirectivesModule } from '@core/directives/directives';
import { RouteGuard } from './services/routeGuard';

import { CorePipesModule } from '@core/pipes/pipes.module';

import { APIService } from './services/apiService';
import { CoreLoadingScreenService } from './services/loading-screen.service';
import { AlertService } from './services/alertService';
import { UserProfileService } from './services/user-profile.service';
import { StateService } from './services/state-service.service';
import { MessageService } from './services/message.service';
import { AuthService } from './services/authService';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/authInterceptor';
import { CookieService } from "ngx-cookie-service";
import { FinancialYearService } from './services/financialYear.Service';

@NgModule({
  imports: [CommonModule,FlexLayoutModule,FormsModule,ReactiveFormsModule, CoreDirectivesModule,CorePipesModule,
 ],
 
  declarations: [
  ],

  exports: [CommonModule,
    FlexLayoutModule,
    FormsModule, 
    CoreDirectivesModule,
    CorePipesModule,
  
  ],
  providers: [
    RouteGuard,APIService,CoreLoadingScreenService,AlertService,StateService,MessageService,
    AuthService,
    CookieService,FinancialYearService,
    //RouteGaurd,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
  ] // these should be singleton
})
export class CoreCommonModule { }
