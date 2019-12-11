import { colors } from "./colors";
import UserIcon from "@carbon/icons/es/user/20";
import BugIcon from "@carbon/icons/es/debug/20";
import ScreenIcon from "@carbon/icons/es/screen/20";

const nodeData = [
	{ id: "a", x: 0, y: 0, icon: UserIcon, onClick: () => console.log("clicked") },
	{ id: "b", x: 350, y: 0, icon: ScreenIcon },
	{ id: "c", x: 350, y: 300, kind: "warning", icon: ScreenIcon },
	{ id: "d", x: 700, y: 300, kind: "error", icon: BugIcon },
];

const linkData = [
	{ source: "a", target: "b", multiDirectional: true },
	{ source: "c", target: "b", dash: "8, 4" },
	{ source: "d", target: "c", kind: "error", multiDirectional: true  },
	{ source: "d", target: "c", kind: "error", multiDirectional: true }];

const linkMapped = linkData.map(link => {
	const sourceNode = nodeData.find(node => node.id === link.source);
	const targetNode = nodeData.find(node => node.id === link.target);

	return {
		...link,
		source: sourceNode,
		target: targetNode
	};
});

export const networkOptions = {
	title: "Network diagram",
	// TODO try out axis logic here...
	margin: 80,
	nodeHeight: 64,
	nodeWidth: 208
};

export const networkData = {
	labels: [], // Todo: Add these as swimlanes?
	datasets: [
		{
			nodes: nodeData,
			links: linkMapped
		}
	]
};
