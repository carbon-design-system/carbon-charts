import { TreeChart as TreeChartCore, type TreeChartOptions } from '@carbon/charts'
import BaseChart from './BaseChart'

interface TreeNode {
	name: string
	value?: number
	children?: TreeNode[]
}

export default class TreeChart extends BaseChart<TreeChartCore, TreeChartOptions, TreeNode> {}
