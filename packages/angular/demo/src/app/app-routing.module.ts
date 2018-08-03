import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
	{
		path: "",
		loadChildren: "app/home/home.module#HomeModule"
	},
	{
		path: "pie",
		loadChildren: "app/pie/pie.module#PieModule"
	},
	{
		path: "donut",
		loadChildren: "app/donut/donut.module#DonutModule"
	},
	{
		path: "bar",
		loadChildren: "app/bar/bar.module#BarModule"
	},
	{
		path: "line",
		loadChildren: "app/line/line.module#LineModule"
	},
	{
		path: "",
		redirectTo: "",
		pathMatch: "full"
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
