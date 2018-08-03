import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { TranslateModule } from "@ngx-translate/core";

import {
	TopNavModule,
	SideNavModule,
	TreeViewModule,
	IconModule,
	IconService,
	ModalModule,
	NFormsModule,
} from "@peretz/neutrino";

import { AppComponent } from "./app.component";

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		IconModule,
		HttpModule,
		ModalModule,
		NFormsModule,
		SideNavModule,
		TopNavModule,
		TreeViewModule,
		AppRoutingModule,
		TranslateModule.forRoot(),
	],
	providers: [IconService],
	bootstrap: [AppComponent]
})
export class AppModule { }
