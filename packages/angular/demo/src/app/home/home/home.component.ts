import { Component, OnInit, Injector } from "@angular/core";
import { Modal, ModalService } from "@peretz/neutrino";

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
	constructor(private modalService: ModalService) { }

	ngOnInit() {
	}
}
