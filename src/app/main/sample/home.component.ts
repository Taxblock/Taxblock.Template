import { Component, OnInit, ViewChild } from "@angular/core";
@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

	constructor() {}

	public contentHeader: object;


	ngOnInit() {
		this.contentHeader = {
			headerTitle: "Home",
			actionButton: true,
			breadcrumb: {
				type: "",
				links: [
					{
						name: "Home",
						isLink: true,
						link: "/",
					},
					{
						name: "Sample",
						isLink: false,
					},
				],
			},
		};
	}

	onSubmit(){

	}


}
