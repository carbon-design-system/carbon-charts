import { Component, Input, OnInit } from "@angular/core";
import ELK from "elkjs/lib/elk.bundled";
import { path as d3Path } from "d3-path";

@Component({
	selector: "ibm-graph-elk",
	template: `
	<svg *ngIf="positions" height="1000" width="1000" xmlns:xhtml="http://www.w3.org/1999/xhtml">
		<svg:defs>
			<svg:marker ibm-graph-marker-circle [id]="'circle'" [position]="'start'"></svg:marker>
			<svg:marker ibm-graph-marker-tee [id]="'tee'" [position]="'end'" ></svg:marker>
		</svg:defs>
		<svg:g ibm-graph-edge *ngFor="let edge of positions.edges" [path]="buildPath(edge)" [markerStart]="'circle'" [markerEnd]="'tee'" [variant]="'dash-sm'"></svg:g>
		<svg:foreignObject *ngFor="let node of positions.children"  style="overflow: visible" [attr.height]="node.height" [attr.width]="node.width" attr.transform="translate({{node.x}},{{node.y}})">
			<xhtml:div>
				<ibm-graph-circle [size]="node.height" [renderIcon]="userTemplate"></ibm-graph-circle>
			</xhtml:div>
		</svg:foreignObject>
	</svg>

	<ng-template #userTemplate>
		<svg ibmIconUser size="16"></svg>
	</ng-template>
	`
})

export class ElkComponent implements OnInit {
	@Input() nodes;
	@Input() links;
	@Input() layout;

	positions;
	buildPath;

	ngOnInit() {
		const elk = new ELK();

		const graph = {
			id: "root",
			layoutOptions: {
				"elk.algorithm": this.layout,
				"elk.padding": "[left=50, top=50, right=50, bottom=50]",
				separateConnectedComponents: "false",
				"spacing.nodeNode": "100",
				"spacing.nodeNodeBetweenLayers": "100",
			},
			children: this.nodes,
			edges: this.links,
		};

		elk.layout(graph)
			.then((g) => {
				this.positions = g;
			})
			.catch(console.error);

		this.buildPath = (link) => {
			const sections = link.sections[0];
			const path = d3Path();

			path.moveTo(sections.startPoint.x, sections.startPoint.y);

			if (sections.bendPoints) {
				sections.bendPoints.forEach((b) => {
					path.lineTo(b.x, b.y);
				});
			}

			path.lineTo(sections.endPoint.x, sections.endPoint.y);

			return path.toString();
		};
	}
}
