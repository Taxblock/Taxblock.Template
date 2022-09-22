import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { AlertService } from '@core/services/alertService';
import { LoginModel } from '../model/LoginModel';
import { ForgetPasswordService } from './forgot-password.service';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit {
  // Public
  public emailVar;
  public coreConfig: any;
  public forgotPasswordForm: FormGroup;
  public enterNewPasswordForm: FormGroup;

  public submitted = false;
  loginModel = new LoginModel();


  // Private
  private _unsubscribeAll: Subject<any>;
  EnterOTP: boolean = false;
  EnterNewPassword: boolean = false;
  submitted1: boolean = false;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {FormBuilder} _formBuilder
   *
   */
  constructor(private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private alertService: AlertService,
    private forgetPasswordService: ForgetPasswordService,

  ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: true
        },
        menu: {
          hidden: true
        },
        footer: {
          hidden: true
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgotPasswordForm.controls;
  }

  get f2() {
    return this.enterNewPasswordForm.controls;
  }

  /**
   * On Submit
   */
  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    if (this.enterNewPasswordForm.invalid) {
      return;
    }
  }
  onSavePass() {

    this.submitted1 = true;

    // stop here if form is invalid

    if (this.enterNewPasswordForm.invalid) {
      return;
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      OTP: ['', [Validators.required]]
    });

    this.enterNewPasswordForm = this._formBuilder.group({
      Password: ['', [Validators.required,]],
      ConfirmPassword: ['', [Validators.required,]],

    });

    // Subscribe to config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // onClickSendOTP() {
  //   if (this.f.email.valid) {
  //     this.EnterOTP = true;
  //   }
  // }
  onClickVerifyOTP() {
    if (this.f.OTP.valid) {
      this.EnterNewPassword = true;
    }
  }
  onClickSendOTP(): void {
    this.EnterOTP = true;
    if (this.f.email.valid) {
      let userName = this.forgotPasswordForm.value.email;
      this.forgetPasswordService.VerifyAccount(userName).subscribe(
        (result: any) => {
          let data = result.Value;
          //  this.UserData = data
          //     this.alertService.ShowSuccessMessage("OTP send on your register Email address");
          //     this.EnterOTP = true;
          //   },
          //   (error:any) => {
          //     this.alertService.ShowError(error,"Failed to send OTP due to unknown error");

        }
      );
    }
    else {
      this.alertService.ShowErrorMessage("Validation Failed");
    }
  }
}
