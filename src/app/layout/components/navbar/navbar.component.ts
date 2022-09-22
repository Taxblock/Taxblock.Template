import { Component, OnDestroy, OnInit, HostBinding, HostListener, ViewEncapsulation } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from '@core/services/config.service';
import { CoreMediaService } from '@core/services/media.service';


import { UserProfileService } from '@core/services/user-profile.service';
import { IdentityUser } from '@core/models/identty-user.model';
import { FinancialYearService } from '@core/services/financialYear.Service';
import { UserRoleType } from '@core/models/user-role-type.model';
import { CookieService } from 'ngx-cookie-service';
import { CoreMenuService } from '@core/components/core-menu/core-menu.service';
import { TranslateService } from '@ngx-translate/core';
import { RoleDetails } from '@core/models/role-Details';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit, OnDestroy {
  public horizontalMenu: boolean;
  public hiddenMenu: boolean;

  public coreConfig: any;
  public currentSkin: string;
  public prevSkin: string;
  public RollName: any;
  public currentUser: IdentityUser;

  FYAYList : Array<any> =[];
  FYAYId : number = 0;
  RoleList:Array<any>=[];
  RoleId : number = 0;

  @HostBinding('class.fixed-top')
  public isFixed = false;

  @HostBinding('class.navbar-static-style-on-scroll')
  public windowScrolled = false;

  // Add .navbar-static-style-on-scroll on scroll using HostListener & HostBinding
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) &&
      this.coreConfig.layout.navbar.type == 'navbar-static-top' &&
      this.coreConfig.layout.type == 'horizontal'
    ) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {CoreSidebarService} _coreSidebarService
   * @param {CoreMediaService} _coreMediaService
   * @param {MediaObserver} _mediaObserver
   */
  constructor(
    private _userProfileService: UserProfileService,
    private _coreConfigService: CoreConfigService,
    private _coreMediaService: CoreMediaService,
    private _coreSidebarService: CoreSidebarService,
    private _mediaObserver: MediaObserver,
    private _cookieService: CookieService,
    private _financialYearService:FinancialYearService,
    private _coreMenuService : CoreMenuService,
    private _translateService : TranslateService,
    private route: Router
    
  ) {

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar open
   *
   * @param key
   */
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }


  /**
   * Toggle Dark Skin
   */
  toggleDarkSkin() {
    // Get the current skin
    this._coreConfigService
      .getConfig()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(config => {
        this.currentSkin = config.layout.skin;
      });

    // Toggle Dark skin with prevSkin skin
    this.prevSkin = localStorage.getItem('prevSkin');

    if (this.currentSkin === 'dark') {
      this._coreConfigService.setConfig(
        { layout: { skin: this.prevSkin ? this.prevSkin : 'default' } },
        { emitEvent: true }
      );
    } else {
      localStorage.setItem('prevSkin', this.currentSkin);
      this._coreConfigService.setConfig({ layout: { skin: 'dark' } }, { emitEvent: true });
    }
  }

  /**
   * Logout method
   */
  logout() {
    this._cookieService.delete(environment.AUTH_COOKIE_NAME,"/",environment.DOMAIN);
    this._cookieService.delete(environment.AUTH_COOKIE_NAME,"/");
    //this._userProfileService.logout();
    this.route
						.navigateByUrl("/authentication/login")
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // get the currentUser details from localStorage
   
  //  this.onRoleChange();
    this._userProfileService.currentUserSubject.subscribe((user)=> {
      this.currentUser = user;
      this.RoleList=user.roles; 
      if(user.roles && user.roles.length > 0 && 
        (user.CurrentRoleId == null || user.CurrentRoleId ==0))
      {
        this.RoleId = user.roles[0].roleId;
        this.onRoleChange();
        this.LoadFinancialYear();
      }
  });

    // Subscribe to the config changes
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
      this.horizontalMenu = config.layout.type === 'horizontal';
      this.hiddenMenu = config.layout.menu.hidden === true;
      this.currentSkin = config.layout.skin;

      // Fix: for vertical layout if default navbar fixed-top than set isFixed = true
      if (this.coreConfig.layout.type === 'vertical') {
        setTimeout(() => {
          if (this.coreConfig.layout.navbar.type === 'fixed-top') {
            this.isFixed = true;
          }
        }, 0);
      }
    });

    // Horizontal Layout Only: Add class fixed-top to navbar below large screen
    if (this.coreConfig.layout.type == 'horizontal') {
      // On every media(screen) change
      this._coreMediaService.onMediaUpdate.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
        const isFixedTop = this._mediaObserver.isActive('bs-gt-xl');
        if (isFixedTop) {
          this.isFixed = false;
        } else {
          this.isFixed = true;
        }
      });
    }

  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
   
  }

  onRoleChange()
  {
    let currentUserValue = this._userProfileService.CurrentUserValue;
    currentUserValue.CurrentRoleId = 1;
   // this.RollName = currentUserValue.Roles[this.RoleId].Name;
    this.SetRoleMenu(currentUserValue.roles.filter(f=> f.roleId == 1)[0]);

    this._userProfileService.SetUserData(currentUserValue);
  }

  onFYChange() {
      let currentUserValue = this._userProfileService.CurrentUserValue;
      currentUserValue.FYAYId = this.FYAYId;
      currentUserValue.FY =  this.FYAYList.filter(x=> x.FYAYId == this.FYAYId)[0].FY;
      
     // currentUserValue.CurrentRoleId = UserRoleType.Advisor;
      this._userProfileService.SetUserData(currentUserValue);
  }

  LoadFinancialYear() {
    this._financialYearService.LoadFinancialYear().subscribe((result: any) => {
      this.FYAYList = result.Value;
      if(this.FYAYList && this.FYAYList.length > 0 &&  this.FYAYList.filter(x=> x.IsDefault == true).length > 0)
      {
        this.FYAYId =  this.FYAYList.filter(x=> x.IsDefault == true)[0].FYAYId;
        
        this.onFYChange();
      }
    });
  }


  SetRoleMenu(roleDetails:RoleDetails)
  {
      // Set the main menu as our current menu
      this.RollName = roleDetails.name;
      this._coreMenuService.setCurrentMenu(roleDetails.name);
      
  }

}
