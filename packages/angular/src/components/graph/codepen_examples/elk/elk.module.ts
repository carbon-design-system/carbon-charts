import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ElkComponent } from "./elk.component";
export { ElkComponent } from "./elk.component";
import { CircleModule } from "../../circle/circle.module";
import { UserModule } from "@carbon/icons-angular";
import { EdgeModule } from "../../edge/edge.module";
import { MarkerModule } from "../../marker/marker.module";

@NgModule({
	declarations: [ElkComponent],
	exports: [ElkComponent],
	imports: [CommonModule, CircleModule, UserModule, EdgeModule, MarkerModule]
})
export class ElkModule { }
