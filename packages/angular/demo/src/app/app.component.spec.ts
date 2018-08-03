import { TestBed, async } from "@angular/core/testing";

import { RouterTestingModule } from "@angular/router/testing";

import { TranslateModule } from "@ngx-translate/core";

// Peretz
import {
	TopNavModule,
	SideNavModule,
	TreeViewModule,
	IconModule,
	IconService,
	ModalModule
} from "@peretz/neutrino";

import { AppComponent } from "./app.component";

describe("AppComponent", () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				AppComponent
			],
			imports: [
				RouterTestingModule,
				TopNavModule,
				SideNavModule,
				TreeViewModule,
				IconModule,
				ModalModule,
				TranslateModule.forRoot()
			],
			providers: [IconService]
		}).compileComponents();
	}));

	it("should create the app", async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
});
