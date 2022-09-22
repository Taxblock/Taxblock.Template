import {
	Component,
	Inject,
	OnDestroy,
	OnInit,
	ElementRef,
	Renderer2,
	HostListener,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Title } from "@angular/platform-browser";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import * as Waves from "node-waves";

import { CoreMenuService } from "@core/components/core-menu/core-menu.service";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { CoreConfigService } from "@core/services/config.service";
import { CoreLoadingScreenService } from "@core/services/loading-screen.service";
import { CoreTranslationService } from "@core/services/translation.service";

import { AlertService } from "@core/services/alertService";
import { environment } from "environments/environment";
import { UserProfileService } from "@core/services/user-profile.service";
import { AuthService } from "@core/services/authService";
import { CookieService } from "ngx-cookie-service";
import { IdentityUser } from "@core/models/identty-user.model";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
	coreConfig: any;
	menu: any;
	defaultLanguage: "en"; // This language will be used as a fallback when a translation isn't found in the current language
	appLanguage: "en"; // Set application default language i.e fr

	// Private
	private _unsubscribeAll: Subject<any>;

	/**
	 * Constructor
	 *
	 * @param {DOCUMENT} document
	 * @param {Title} _title
	 * @param {Renderer2} _renderer
	 * @param {ElementRef} _elementRef
	 * @param {CoreConfigService} _coreConfigService
	 * @param {CoreSidebarService} _coreSidebarService
	 * @param {CoreLoadingScreenService} _coreLoadingScreenService
	 * @param {CoreMenuService} _coreMenuService
	 * @param {CoreTranslationService} _coreTranslationService
	 * @param {TranslateService} _translateService
	 */
	constructor(
		@Inject(DOCUMENT) private document: any,
		private _title: Title,
		private _renderer: Renderer2,
		private _elementRef: ElementRef,
		public _coreConfigService: CoreConfigService,
		private _coreSidebarService: CoreSidebarService,
		private _coreLoadingScreenService: CoreLoadingScreenService,
		private _coreMenuService: CoreMenuService,
		private _coreTranslationService: CoreTranslationService,
		private _translateService: TranslateService,
		private _alertService: AlertService,
		private _userProfileService: UserProfileService,
		private _authService: AuthService,
		private _cookieService: CookieService
	) {
		// Set the private defaults
		this._unsubscribeAll = new Subject();
	}

	// Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		// Init wave effect (Ripple effect)
		Waves.init();

		// Subscribe to config changes
		this._coreConfigService.config
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe((config) => {
				this.coreConfig = config;

				// Set application default language.

				// Change application language? Read the ngxTranslate Fix

				// ? Use app-config.ts file to set default language
				const appLanguage = this.coreConfig.app.appLanguage || "en";
				this._translateService.use(appLanguage);

				// ? OR
				// ? User the current browser lang if available, if undefined use 'en'
				// const browserLang = this._translateService.getBrowserLang();
				// this._translateService.use(browserLang.match(/en|fr|de|pt/) ? browserLang : 'en');

				/**
				 * ! Fix : ngxTranslate
				 * ----------------------------------------------------------------------------------------------------
				 */

				/**
				 *
				 * Using different language than the default ('en') one i.e French?
				 * In this case, you may find the issue where application is not properly translated when your app is initialized.
				 *
				 * It's due to ngxTranslate module and below is a fix for that.
				 * Eventually we will move to the multi language implementation over to the Angular's core language service.
				 *
				 **/

				// Set the default language to 'en' and then back to 'fr'.

				setTimeout(() => {
					this._translateService.setDefaultLang("en");
					this._translateService.setDefaultLang(appLanguage);
				});

				/**
				 * !Fix: ngxTranslate
				 * ----------------------------------------------------------------------------------------------------
				 */

				// Layout
				//--------

				// Remove default classes first
				this._elementRef.nativeElement.classList.remove(
					"vertical-layout",
					"vertical-menu-modern",
					"horizontal-layout",
					"horizontal-menu"
				);
				// Add class based on config options
				if (this.coreConfig.layout.type === "vertical") {
					this._elementRef.nativeElement.classList.add(
						"vertical-layout",
						"vertical-menu-modern"
					);
				} else if (this.coreConfig.layout.type === "horizontal") {
					this._elementRef.nativeElement.classList.add(
						"horizontal-layout",
						"horizontal-menu"
					);
				}

				// Navbar
				//--------

				// Remove default classes first
				this._elementRef.nativeElement.classList.remove(
					"navbar-floating",
					"navbar-static",
					"navbar-sticky",
					"navbar-hidden"
				);

				// Add class based on config options
				if (this.coreConfig.layout.navbar.type === "navbar-static-top") {
					this._elementRef.nativeElement.classList.add("navbar-static");
				} else if (this.coreConfig.layout.navbar.type === "fixed-top") {
					this._elementRef.nativeElement.classList.add("navbar-sticky");
				} else if (this.coreConfig.layout.navbar.type === "floating-nav") {
					this._elementRef.nativeElement.classList.add("navbar-floating");
				} else {
					this._elementRef.nativeElement.classList.add("navbar-hidden");
				}

				// Footer
				//--------

				// Remove default classes first
				this._elementRef.nativeElement.classList.remove(
					"footer-fixed",
					"footer-static",
					"footer-hidden"
				);

				// Add class based on config options
				if (this.coreConfig.layout.footer.type === "footer-sticky") {
					this._elementRef.nativeElement.classList.add("footer-fixed");
				} else if (this.coreConfig.layout.footer.type === "footer-static") {
					this._elementRef.nativeElement.classList.add("footer-static");
				} else {
					this._elementRef.nativeElement.classList.add("footer-hidden");
				}

				// Blank layout
				if (
					this.coreConfig.layout.menu.hidden &&
					this.coreConfig.layout.navbar.hidden &&
					this.coreConfig.layout.footer.hidden
				) {
					this._elementRef.nativeElement.classList.add("blank-page");
					// ! Fix: Transition issue while coming from blank page
					this._renderer.setAttribute(
						this._elementRef.nativeElement.getElementsByClassName(
							"app-content"
						)[0],
						"style",
						"transition:none"
					);
				} else {
					this._elementRef.nativeElement.classList.remove("blank-page");
					// ! Fix: Transition issue while coming from blank page
					setTimeout(() => {
						this._renderer.setAttribute(
							this._elementRef.nativeElement.getElementsByClassName(
								"app-content"
							)[0],
							"style",
							"transition:300ms ease all"
						);
					}, 0);
					// If navbar hidden
					if (this.coreConfig.layout.navbar.hidden) {
						this._elementRef.nativeElement.classList.add("navbar-hidden");
					}
					// Menu (Vertical menu hidden)
					if (this.coreConfig.layout.menu.hidden) {
						this._renderer.setAttribute(
							this._elementRef.nativeElement,
							"data-col",
							"1-column"
						);
					} else {
						this._renderer.removeAttribute(
							this._elementRef.nativeElement,
							"data-col"
						);
					}
					// Footer
					if (this.coreConfig.layout.footer.hidden) {
						this._elementRef.nativeElement.classList.add("footer-hidden");
					}
				}

				// Skin Class (Adding to body as it requires highest priority)
				if (
					this.coreConfig.layout.skin !== "" &&
					this.coreConfig.layout.skin !== undefined
				) {
					this.document.body.classList.remove(
						"default-layout",
						"bordered-layout",
						"dark-layout",
						"semi-dark-layout"
					);
					this.document.body.classList.add(
						this.coreConfig.layout.skin + "-layout"
					);
				}
			});

		// Set the application page title
		this._title.setTitle(this.coreConfig.app.appTitle);

		this.CheckAuthentication();
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
	}

	// Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Toggle sidebar open
	 *
	 * @param key
	 */
	toggleSidebar(key): void {
		this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
	}

	CheckAuthentication() {
		var userData = this._cookieService.get(environment.AUTH_COOKIE_NAME);

		if (!environment.production && !userData) {
			this._cookieService.set(
				environment.AUTH_COOKIE_NAME,
				this.GetUserDetails(),
				{ domain: environment.DOMAIN }
			);

			userData = this._cookieService.get(environment.AUTH_COOKIE_NAME);
		}

		// if (userData) {
		// 	this._userProfileService.SetUserData(JSON.parse(userData));
		// 	this._authService.ValidateAccess().subscribe(
		// 		(result) => {
		// 			if (result && result.Value) {
		// 				let userDetails = <IdentityUser>result.Value;
		// 				userDetails.Roles.forEach((role) => {
		// 					this._coreMenuService.register(role.Name, role.RolesMenu);
		// 				});

		// 				// Add languages to the translation service
		// 				this._translateService.addLangs(["en", "fr", "de", "pt"]);
		// 				// This language will be used as a fallback when a translation isn't found in the current language
		// 				this._translateService.setDefaultLang("en");
		// 				// Set the translations for the menu

		// 				this._userProfileService.SetUserData(userDetails);

		// 				//this._coreTranslationService.translate(menuEnglish, menuFrench, menuGerman, menuPortuguese);
		// 			} else {
		// 			//	this._userProfileService.logout();
		// 			}
		// 		},
		// 		(error) => {
		// 			this._alertService.ShowErrorMessage(
		// 				"Failed to validate access due to application error. Please try again."
		// 			);
		// 		//	this._userProfileService.logout();
		// 		}
		// 	);
		// } else {
		// 	//this._userProfileService.logout();
		// }
	}

	GetUserDetails() {
		return JSON.stringify({
			"ComputerName": "DESKTOP-9O88495",
			"EnableBackOffice": false,
			"RoleId": 2,
			"IdentityUserId": null,
			"UserId": 90614,
			"UserName": "Amit",
			"PasswordHash": null,
			"Email": "amit.khaire@taxblock.in",
			"EmailConfirmed": null,
			"SecurityStamp": null,
			"PhoneNumber": null,
			"PhoneNumberConfirmed": null,
			"TwoFactorEnabled": null,
			"LockoutEndDateUtc": "0001-01-01T00:00:00+05:30",
			"LockoutEnabled": null,
			"AccessFailedCount": 0,
			"SID": 0,
			"IsActive": null,
			"URID": "00000000-0000-0000-0000-000000000000",
			"ApplicationToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBbWl0IiwianRpIjpbImFiY2ZiMmExLTE1MGMtNGQ4Yy1hNjYzLWRhY2NmNjVkOTZlOCIsIjhjNGYzOWQ0LTA5OTItNDgwNi1iZTZjLWI4ZDQxMTdiYjFmMyJdLCJpYXQiOiIzMC0wNy0yMDIyIDA2OjU5OjI3IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiOTA2MTQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQW1pdCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDkvMDkvaWRlbnRpdHkvY2xhaW1zL2FjdG9yIjoiQWRtaW4iLCJVc2VySWQiOiI5MDYxNCIsIkVtYWlsSWQiOiJhbWl0LmtoYWlyZUB0YXhibG9jay5pbiIsImV4cCI6MTY1OTI2ODc2NywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo2MjcwMy8iLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjYyNzAzLyJ9.CrObuGtB6ypAKD-XV91MKjklaN1WwHgwWfuC989gnOI",
			"AddedBy": null,
			"AddedDate": null,
			"UpdatedBy": null,
			"UpdatedDate": null
		});
	}
}
