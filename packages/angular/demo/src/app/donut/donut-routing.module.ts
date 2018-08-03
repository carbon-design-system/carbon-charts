import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DonutComponent } from "./donut/donut.component";

const routes: Routes = [{
	path: "",
	component: DonutComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DonutRoutingModule { }
