import { colors } from "./colors";
import UserIcon from "@carbon/icons/es/user/20";
import BugIcon from "@carbon/icons/es/debug/20";
import ScreenIcon from "@carbon/icons/es/screen/20";

const nodeData = [
	{ id: "a", heading: "User", subheading: "John Doe", x: 0, y: 0, icon: UserIcon, onClick: () => console.log("clicked") },
	{ id: "b", heading: "IP", subheading: "192.168.1.1", x: 1, y: 0, icon: ScreenIcon },
	{ id: "c", heading: "IP", subheading: "0.0.0.0", x: 1, y: 1, kind: "warning", icon: ScreenIcon },
	{ id: "d", heading: "Malware", subheading: "Description", x: 2, y: 1, kind: "error", icon: BugIcon },
];

const linkData = [
	{ source: "a", target: "b", directional: true },
	{ source: "a", target: "c", directional: true },
	{ source: "d", target: "b", dash: "4, 4", directional: true },
	{ source: "d", target: "c", kind: "error", directional: true  }];

export const networkOptions = {
	title: "Network diagram",
	// TODO try out axis logic here
	margin: 80,
	nodeHeight: 64,
	nodeWidth: 208,
	cellWidth: 284,
	cellHeight: 88
};

export const networkData = {
	labels: [], // TODO Add these as swim-lanes?
	datasets: [
		{
			nodes: nodeData,
			links: linkData
		}
	]
};
