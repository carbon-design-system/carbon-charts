import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BarComponent } from "./bar/bar.component";

const routes: Routes = [{
	path: "",
	component: BarComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BarRoutingModule { }
