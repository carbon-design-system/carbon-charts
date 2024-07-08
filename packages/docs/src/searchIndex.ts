import lunr from 'lunr'

interface Document {
	id: string
	title: string
	content: string
}

const documents: Document[] = [
	{ id: 'introduction', title: 'Introduction', content: 'Introduction content' },
	{ id: 'installation', title: 'Installation', content: 'Installation content' },
	{ id: 'anatomy', title: 'Anatomy', content: 'Anatomy content' },
	{ id: 'data', title: 'Data', content: 'Data content' },
	{ id: 'options', title: 'Options', content: 'Options content' },
	{ id: 'api', title: 'API', content: 'API content' },
	{ id: 'themes', title: 'Themes', content: 'Themes content' },
	{ id: 'axes', title: 'Axes', content: 'Axes content' },
	{ id: 'palettes', title: 'Palettes', content: 'Palettes content' },
	{ id: 'dashboards', title: 'Dashboards', content: 'Dashboards content' },
	{ id: 'alluvial', title: 'Alluvial', content: 'Alluvial content' },
	{ id: 'area', title: 'Area', content: 'Area content' },
	{ id: 'bar', title: 'Bar', content: 'Bar content' },
	{ id: 'boxplot', title: 'Boxplot', content: 'Boxplot content' },
	{ id: 'bubble', title: 'Bubble', content: 'Bubble content' },
	{ id: 'bullet', title: 'Bullet', content: 'Bullet content' },
	{ id: 'choropleth', title: 'Choropleth', content: 'Choropleth content' },
	{ id: 'circlepack', title: 'Circle Pack', content: 'Circle Pack content' },
	{ id: 'combo', title: 'Combo', content: 'Combo content' },
	{ id: 'donut', title: 'Donut', content: 'Donut content' },
	{ id: 'gauge', title: 'Gauge', content: 'Gauge content' },
	{ id: 'heatmap', title: 'Heatmap', content: 'Heatmap content' },
	{ id: 'histogram', title: 'Histogram', content: 'Histogram content' },
	{ id: 'line', title: 'Line', content: 'Line content' },
	{ id: 'lollipop', title: 'Lollipop', content: 'Lollipop content' },
	{ id: 'meter', title: 'Meter', content: 'Meter content' },
	{ id: 'pie', title: 'Pie', content: 'Pie content' },
	{ id: 'radar', title: 'Radar', content: 'Radar content' },
	{ id: 'scatter', title: 'Scatter', content: 'Scatter content' },
	{ id: 'tree', title: 'Tree', content: 'Tree content' },
	{ id: 'treemap', title: 'Treemap', content: 'Treemap content' },
	{ id: 'wordcloud', title: 'Word Cloud', content: 'Word Cloud content' },
	{ id: 'diagram', title: 'Network Diagrams', content: 'Network Diagrams content' }
]

const index = lunr(function () {
	this.field('title')
	this.field('content')
	this.ref('id')

	documents.forEach(doc => {
		this.add(doc)
	})
})

export { index, documents }
