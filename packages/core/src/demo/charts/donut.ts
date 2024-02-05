import { pieData, pieDataMapsTo } from './pie'
import { Alignments } from '@/interfaces'

export const donutData = pieData

export const donutOptions = {
	title: 'Donut',
	resizable: true,
	donut: {
		center: {
			label: 'Browsers'
		}
	}
}

export const donutCenteredData = pieData

export const donutCenteredOptions = {
	title: 'Donut (centered)',
	resizable: true,
	legend: {
		alignment: Alignments.CENTER
	},
	donut: {
		center: {
			label: 'Browsers'
		},
		alignment: Alignments.CENTER
	}
}

// donut - using a different value key
export const donutDataMapsTo = pieDataMapsTo
export const donutMapsToOptions = {
	title: 'Donut (value maps to count)',
	resizable: true,
	pie: {
		valueMapsTo: 'count'
	}
}

// donut - empty state
export const donutEmptyStateData: any[] = []
export const donutEmptyStateOptions = {
	title: 'Donut (empty state)',
	resizable: true,
	donut: {
		center: {
			label: 'Browsers'
		}
	}
}

// donut - skeleton
export const donutSkeletonData: any[] = []
export const donutSkeletonOptions = {
	title: 'Donut (skeleton)',
	resizable: true,
	donut: {
		center: {
			label: 'Browsers'
		}
	},
	data: {
		loading: true
	}
}
