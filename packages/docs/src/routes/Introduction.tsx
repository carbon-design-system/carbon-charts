import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import GraphTile from '../components/GraphTile'

import './Introduction.scss'

export default function Introduction() {
	return (
		<>
			<PageHeader title="Introduction" />

			<p>
				Carbon Charts is a component library of 26 charts for vanilla JavaScript, Svelte, React, Vue
				and Angular. Detailed documentation and StackBlitz examples are provided to get you up and
				running quickly. Components are highly customizable with advanced functionality such as{' '}
				<Link to="/themes">themes</Link>, <Link to="/axes#dual">dual axes</Link>,{' '}
				<Link to="/palettes">color palettes</Link>, <Link to="/combo">combo charts</Link>, and event
				handling.
			</p>

			<p>
				To get started, go to the <Link to="/installation">Installation &amp; setup</Link> page and
				select your preferred framework. Alternatively, jump ahead to StackBlitz examples in various
				frameworks provided for each of the chart types by clicking the icons below.
			</p>

			<h2>Comparisons</h2>

			<div className="graph-tiles">
				<GraphTile title="Bar (vertical)" route="/bar#vertical" svg="bar" />
				<GraphTile title="Bar (grouped)" route="/bar#grouped" svg="bargrouped" />
				<GraphTile title="Bar (horizontal floating)" route="/bar#horizontal" svg="barfloating" />
				<GraphTile title="Lollipop" route="/lollipop" svg="lollipop" />
				<GraphTile route="/bubble" title="Bubble" svg="bubble" />
				<GraphTile route="/radar" title="Radar / kiviat" svg="radar" />
				<GraphTile route="/wordcloud" title="Word cloud" svg="wordcloud" />
			</div>

			<h2>Trends</h2>
			<div className="graph-tiles">
				<GraphTile route="/area" title="Area" svg="area" />
				<GraphTile route="/boxplot" title="Boxplot" svg="boxplot" />
				<GraphTile route="/histogram" title="Histogram" svg="histogram" />
				<GraphTile route="/line" title="line" svg="line" />
			</div>

			<h2>Part-to-whole</h2>
			<div className="graph-tiles">
				<GraphTile route="/area#stacked" title="Area (stacked)" svg="areastack" />
				<GraphTile route="/bar#stacked" title="Bar (stacked)" svg="barstack" />
				<GraphTile route="/bullet" title="Bullet" svg="bullet" />
				<GraphTile route="/circlepack" title="Circle pack" svg="circlepack" />
				<GraphTile route="/donut" title="Donut" svg="donut" />
				<GraphTile route="/gauge" title="Gauge" svg="gauge" />
				<GraphTile route="/meter" title="Meter" svg="meter" />
				<GraphTile route="/pie" title="Pie" svg="pie" />
				<GraphTile route="/treemap" title="Treemap" svg="treemap" />
			</div>

			<h2>Correlations</h2>
			<div className="graph-tiles">
				<GraphTile route="/heatmap" title="Heatmap" svg="heatmap" />
				<GraphTile route="/scatter" title="Scatter" svg="scatter" />
			</div>

			<h2>Connections</h2>
			<div className="graph-tiles">
				<GraphTile route="/alluvial" title="Alluvial" svg="alluvial" />
				<GraphTile route="/diagram" title="Diagrams" svg="diagram" />
				<GraphTile route="/tree" title="Tree" svg="tree" />
			</div>

			<h2>Geospatial</h2>
			<div className="graph-tiles">
				<GraphTile route="/choropleth" title="Choropleth" svg="choropleth" />
			</div>
		</>
	)
}
