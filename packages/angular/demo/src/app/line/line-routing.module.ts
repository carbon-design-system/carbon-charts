import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LineComponent } from "./line/line.component";

const routes: Routes = [{
	path: "",
	component: LineComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LineRoutingModule { }
