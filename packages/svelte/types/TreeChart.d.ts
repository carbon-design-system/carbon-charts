import { TreeChart as TC } from '@carbon/charts';
import type { TreeChartOptions } from '@carbon/charts/interfaces';
import BaseChart from './BaseChart';

interface TreeNode {
	name: string;
	value?: number;
	children?: TreeNode[];
}

export default class TreeChart extends BaseChart<
	TC,
	TreeChartOptions,
	TreeNode
> {}
