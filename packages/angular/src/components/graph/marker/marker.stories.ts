import { storiesOf, moduleMetadata } from "@storybook/angular";
import { MarkerModule } from "./marker.module";
import { EdgeModule } from "../edge/edge.module";

const getTemplate = demo => `
	<div class="container theme--white">
		${demo}
	</div>
`;

const linkSource = { x: 0, y: 0 };
const linkTarget = { x: 400, y: 0 };

storiesOf("Experimental|Marker", module)
.addDecorator(
	moduleMetadata({
		imports: [MarkerModule, EdgeModule]
	})
)
.add("Arrow left", () => ({
	template: getTemplate(`
		<svg height="400" width="400">
			<svg:defs>
				<svg:marker ibm-graph-marker-arrow-left [id]="markerStart"></svg:marker>
			</svg:defs>
			<svg:g transform="translate(16,16)">
				<svg:g ibm-graph-edge [source]="source" [target]="target" [markerStart]="markerStart"></svg:g>
			</svg:g>
		</svg>
	`),
	props: {
		source: linkSource,
		target: linkTarget,
		markerStart: "marker"
	},
}));
