import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import "hammerjs";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";

import { CoreModule } from "@core/core.module";
import { CoreCommonModule } from "@core/common.module";
import { CoreSidebarModule, CoreThemeCustomizerModule } from "@core/components";

import { coreConfig } from "app/app-config";

import { AppComponent } from "app/app.component";
import { LayoutModule } from "app/layout/layout.module";
import { SampleModule } from "app/main/sample/sample.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


const appRoutes: Routes = [
	{
		path: "pages",
		loadChildren: () =>
			import("./main/pages/pages.module").then((m) => m.PagesModule),
	},
	{
		path: "authentication",
		loadChildren: () =>
			import("./main/authentication/authentication.module").then((m) => m.AuthenticationModule), 
	}, 
	
	{
		path: "masters",
		loadChildren: () =>
			import("./main/masters/masters.module").then((m) => m.MastersModule),
	},
	

	{
		path: "",
		redirectTo: "/client-master",
		pathMatch: "full",
	},
	
	{
		path: "**",
		redirectTo: "/pages/miscellaneous/error", //Error 404 - Page not found
	},
];

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		HttpClientModule,
		RouterModule.forRoot(appRoutes, {
			scrollPositionRestoration: "enabled", // Add options right here
			relativeLinkResolution: "legacy",
		}),
		TranslateModule.forRoot(),

		//NgBootstrap
		NgbModule,

		// Core modules
		CoreModule.forRoot(coreConfig),
		CoreCommonModule,
		CoreSidebarModule,
		CoreThemeCustomizerModule,

		// App modules
		LayoutModule,
		SampleModule,
		DataTablesModule
		
		//dialog module
		

	],
	exports:[],

	bootstrap: [AppComponent],
	providers:[]
})
export class AppModule {}
