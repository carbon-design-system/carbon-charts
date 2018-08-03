import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home/home.component";
import { IconModule, ModalModule, NFormsModule } from "@peretz/neutrino";

@NgModule({
	imports: [
		CommonModule,
		HomeRoutingModule,
		IconModule,
		ModalModule,
		NFormsModule
	],
	declarations: [HomeComponent]
})
export class HomeModule { }
