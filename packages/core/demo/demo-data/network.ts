import UserIcon from "@carbon/icons/es/user/20";
import BugIcon from "@carbon/icons/es/debug/20";
import ScreenIcon from "@carbon/icons/es/screen/20";
import WikiIcon from "@carbon/icons/es/wikis/20";

const nodeData = [
	{ id: "a", heading: "User", subheading: "John Doe", column: 0, row: 0, renderIcon: UserIcon, onClick: () => console.log("clicked") },
	{ id: "b", heading: "IP", subheading: "192.168.1.1", column: 1, row: 0, renderIcon: ScreenIcon },
	{ id: "c", heading: "Domain", subheading: "mydomain.net", column: 1, row: 1, kind: "warning", renderIcon: WikiIcon },
	{ id: "d", heading: "Malware", subheading: "WannaCry", column: 2, row: 1, kind: "error", renderIcon: BugIcon },
];

const linkData = [
	{ source: "a", target: "b", directional: true },
	{ source: "a", target: "c", directional: true },
	{ source: "d", target: "b", dash: "4, 4", directional: true },
	{ source: "d", target: "c", kind: "error", directional: true  }];

export const networkOptions = {
	title: "Network diagram (experimental)",
	margin: 80,
	nodeHeight: 64,
	nodeWidth: 208,
	cellWidth: 284,
	cellHeight: 88,
	legend: {
		enabled: false
	}
};

export const networkData = {
	labels: [],
	datasets: [
		{
			nodes: nodeData,
			links: linkData,
			data: [],
		}
	]
};
