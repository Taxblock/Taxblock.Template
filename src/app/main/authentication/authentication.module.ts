import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DataTablesModule } from 'angular-datatables';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { LoginService } from './auth-login/auth-login.service';
import { ForgetPasswordService } from './forgot-password/forgot-password.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthService } from '@core/services/authService';
import { CoreMenuService } from '@core/components/core-menu/core-menu.service';


// routing
const routes: Routes = [
  {
    path: 'login',
    component: AuthLoginComponent, 
    data: { animation: 'auth' }
  }, 
  {
    path: 'forgot-password', 
    component: ForgotPasswordComponent, 
    data: { animation: 'auth' }
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
];

@NgModule({
  declarations: [AuthLoginComponent,ForgotPasswordComponent,ResetPasswordComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, FormsModule, ReactiveFormsModule, CoreCommonModule,DataTablesModule],
  providers:[LoginService,ForgetPasswordService,AuthService,]
})
export class AuthenticationModule {} 
 