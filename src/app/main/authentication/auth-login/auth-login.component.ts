import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { LoginModel } from '../model/LoginModel';
import { LoginService } from './auth-login.service';
import { AlertService } from '@core/services/alertService';
import { IdentityUser } from '@core/models/identty-user.model';
import { AuthService } from '@core/services/authService';
import { CoreMenuService } from '@core/components/core-menu/core-menu.service';
import { UserProfileService } from '@core/services/user-profile.service';

@Component({
  selector: 'auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthLoginComponent implements OnInit {
  //  Public
  public coreConfig: any;
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  public error = '';
  public passwordTextType: boolean;

  loginModel = new LoginModel();


  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
	 * @param {CoreMenuService} _coreMenuService
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private loginService: LoginService,
    private alertService: AlertService,
    private _authService: AuthService,
    private _coreMenuService: CoreMenuService,
		private _userProfileService: UserProfileService,


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
    return this.loginForm.controls;
  }

  /**
   * Toggle password
   */
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    // this.submitted = true;

    // // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // }

    // // Login
    // this.loading = true;

    // // redirect to home page
    // setTimeout(() => {
    //   this._router.navigate(['/']);
    // }, 100);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';

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

  onSignIn_Click() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // }

    // Login
    //this.loading = true;

    // redirect to home page
    // setTimeout(() => {
    //   this._router.navigate(['/']);
    // }, 100);
    if (this.loginForm.valid) {
      let signInFormData = this.loginForm.value;
      if (
        isNaN(parseInt(signInFormData.userId)) ||
        signInFormData.userName == null ||
        signInFormData.userName == undefined
      ) {
      } else {
        this.alertService.ShowErrorMessage('Validation Failed.');
      }
      this.loginModel.userName = signInFormData.email;
      this.loginModel.email = signInFormData.email;
      this.loginModel.passwordHash = signInFormData.password;
      this.loginModel.rememberMe = false;
      this.loginModel.mobileNo = '';
      this.loginModel.newPassword = '';
      this.loginModel.oTP = '';
      this.loginModel.phoneNo = '';
      this.loginModel.userId = 0;
      this.loginModel.CorporateName = '';
      this.loginModel.URID = '36F667DC-DFB2-479B-AB49-C98AC33B4A20';

      this.loginService.Login(this.loginModel).subscribe(
        (result: any) => {
          let serviceResponse = <IdentityUser>result.Value;
          let userDetails = serviceResponse;
           // redirect to home page
           setTimeout(() => {
            this._router.navigate(['/masters/search-client']);
        }, 100);
               userDetails.roles.forEach((role) => {
                 this._coreMenuService.register(role.name, role.rolesMenu);
              });
              this._userProfileService.SetUserData(userDetails);
              

          // this.loginService.setSession(serviceResponse);
          // this._authService.ValidateAccess().subscribe(
          //   (result) => {
          //     if (result && result.Value) {
          //       let userDetails = <IdentityUser>result.Value;
          //       userDetails.Roles.forEach((role) => {
          //         this._coreMenuService.register(role.Name, role.RolesMenu);
          //       });
          //       // redirect to home page
          //       setTimeout(() => {
          //         this._router.navigate(['/masters/search-client']);
          //       }, 100);

          //     } else {
          //       //	this._userProfileService.logout();
          //     }
            // },
        
            // (error) => {
            //   this.alertService.ShowErrorMessage(
            //     "Failed to validate access due to application error. Please try again."
            //   );
            //   //	this._userProfileService.logout();
            // }
          // );


        },
        (error: any) => {
          this.alertService.ShowError(error, 'Invalid User Name And Password');
        }
      );
    }
  }
}
