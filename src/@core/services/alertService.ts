import "rxjs/add/observable/of";
import { Component, OnInit, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs";
import Swal from "sweetalert2";

@Injectable({ providedIn: "root" })
export class AlertService {
	private confirmResult: Observable<boolean>;
	public toast: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	constructor(private router: Router) {}

	ShowInfoMessage(message: any) {
		Swal.fire({
			icon: "info",
			title: "TaxBlock Info",
			text: message,
		});
	}

	ShowSuccessMessage(message: string, action?: string) {
		Swal.fire({
			icon: "success",
			title: "TaxBlock Success",
			text: message,
		});
	}

	ShowWarningMessage(message: any, action?: string) {
		Swal.fire({
			icon: "warning",
			title: "TaxBlock Warning",
			text: message,
		});
	}

	ShowErrorMessage(message: any, action?: string) {
		Swal.fire({
			icon: "error",
			title: "TaxBlock Error",
			text: message,
		});
	}

	addToast(options: any) {
		this.toast.next(options);
	}

	NavigateToRoute(route: string) {
		this.router.navigate([route]);
	}

	ShowError(error: any, message: string = "Failed due to service error") {
		if (
			(error.error && typeof error.error === "string") ||
			error.error instanceof String
		) {
			message = error.error;
		}
		Swal.fire({
			icon: "error",
			title: "TaxBlock Error",
			text: message,
		});
	}
}
