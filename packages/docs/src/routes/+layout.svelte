<script lang="ts">
  import { base } from '$app/paths'
  import {
		Header,
		SideNav,
		SideNavItems,
		SideNavMenu,
		SideNavMenuItem,
		SideNavLink,
		SideNavDivider,
		SkipToContent,
		Content,
		Grid,
		Row,
		Column
	} from 'carbon-components-svelte'

  import Launch from 'carbon-components-svelte/src/icons/Launch.svelte'

	import 'carbon-components-svelte/css/g10.css'
	import '../styles/index.scss'
</script>

<!-- May need urls to start with {base}/ for GitHub -->
<Header platformName="Carbon Charts">
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
</Header>

<SideNav isOpen={true}>
	<SideNavItems>
		<SideNavMenu text="The basics" expanded={true}>
			<SideNavMenuItem href="{base}/" text="Getting started" />
			<SideNavMenuItem href="{base}/anatomy" text="Chart anatomy" />
			<SideNavMenuItem href="{base}/data" text="Tabular data format" />
			<SideNavMenuItem href="{base}/dashboards" text="Dashboards" />
		</SideNavMenu>

		<SideNavDivider />

		<SideNavMenu text="Configuration" expanded={true}>
			<SideNavMenuItem href="{base}/themes" text="Themes" />
			<SideNavMenuItem href="{base}/axes" text="Axes and labels" />
			<SideNavMenuItem href="{base}/color" text="Color palettes" />
			<SideNavMenuItem href="{base}/axes#dual" text="Dual axes" />
		</SideNavMenu>

		<SideNavDivider />

		<SideNavMenu text="Development frameworks" expanded={true}>
			<SideNavMenuItem href="{base}/vanilla" text="Vanilla JavaScript" /><!--includes API, event listeners-->
			<SideNavMenuItem href="{base}/angular" text="Angular" />
			<SideNavMenuItem href="{base}/react" text="React" />
			<SideNavMenuItem href="{base}/svelte" text="Svelte" />
			<SideNavMenuItem href="{base}/vue" text="Vue" />
		</SideNavMenu>

		<SideNavDivider />

		<SideNavMenu text="Chart types" expanded={true}>
			<SideNavMenuItem href="{base}/alluvial" text="Alluvial" />
			<SideNavMenuItem href="{base}/area" text="Area" />
			<SideNavMenuItem href="{base}/area#stacked" text="Area (stacked)" />
			<SideNavMenuItem href="{base}/bar" text="Bar" />
			<SideNavMenuItem href="{base}/bar#grouped" text="Bar (grouped)" />
			<SideNavMenuItem href="{base}/bar#stacked" text="Bar (stacked)" />
			<SideNavMenuItem href="{base}/boxplot" text="Boxplot" />
			<SideNavMenuItem href="{base}/bubble" text="Bubble" />
			<SideNavMenuItem href="{base}/bullet" text="Bullet" />
			<SideNavMenuItem href="{base}/choropleth" text="Choropleth" />
			<SideNavMenuItem href="{base}/circlepack" text="Circle pack" />
			<SideNavMenuItem href="{base}/combo" text="Combo" />
			<SideNavMenuItem href="{base}/donut" text="Donut" />
			<SideNavMenuItem href="{base}/gauge" text="Gauge" />
			<SideNavMenuItem href="{base}/heatmap" text="Heatmap" />
			<SideNavMenuItem href="{base}/histogram" text="Histogram" />
			<SideNavMenuItem href="{base}/line" text="Line" />
			<SideNavMenuItem href="{base}/lollipop" text="Lollipop" />
			<SideNavMenuItem href="{base}/meter" text="Meter" />
			<SideNavMenuItem href="{base}/diagram" text="Network diagrams" />
			<SideNavMenuItem href="{base}/pie" text="Pie" />
			<SideNavMenuItem href="{base}/radar" text="Radar / kiviat" />
			<SideNavMenuItem href="{base}/scatter" text="Scatter" />
			<SideNavMenuItem href="{base}/tree" text="Tree" />
			<SideNavMenuItem href="{base}/treemap" text="Treemap" />
			<SideNavMenuItem href="{base}/wordcloud" text="Word cloud" />
		</SideNavMenu>

		<SideNavDivider />

		<SideNavLink href="https://github.com/carbon-design-system/carbon-charts" text="GitHub" target="_blank" icon={Launch} />
	</SideNavItems>
</SideNav>

<Content>
	<Grid>
		<Row>
			<Column>
				<slot />
			</Column>
		</Row>
	</Grid>
</Content>
