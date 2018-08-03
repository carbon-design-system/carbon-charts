import { Component } from "@angular/core";
import { IconService } from "@peretz/neutrino";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {
	public topNavBadge = "Beta";
	public topNavBrand = "Peretz Charts";
	public topNavTitle = "NG Wrappers";
	public sideNavOpen = false;
	public demoItems = [
	{
		content: "Understand",
		selected: false,
		icon: "alert",
		items: [
			{
				content: "Experience integrations",
				selected: false,
				items: [
					{
						content: "Experience integrations",
						selected: false
					},
					{
						content: "Predictive custom intelligence",
						selected: false
					},
				]
			},
			{
				content: "Predictive custom intelligence",
				selected: false
			},
		]
	},
	{
		content: "Plan",
		selected: false,
		icon: "alert"
	},
	{
		content: "Design",
		selected: false,
		icon: "alert"
	},
	{
		content: "Build",
		selected: false,
		icon: "alert"

	},
	{
		content: "Listen",
		selected: false,
		icon: "alert"

	},
	{
		content: "Optimize",
		selected: false,
		icon: "alert"

	}];

	public demoItems2 = this.clone(this.demoItems);
	public demoItems3 = this.clone(this.demoItems);
	public demoItems4 = this.clone(this.demoItems);

	constructor() {}

	public onClick() {
		this.sideNavOpen = !this.sideNavOpen;
	}

	private clone (el) {
		return JSON.parse(JSON.stringify(el));
	}
}
