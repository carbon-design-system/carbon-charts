import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PieComponent } from "./pie/pie.component";

const routes: Routes = [{
	path: "",
	component: PieComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PieRoutingModule { }
