<script lang="ts">
	import {
		Header,
		SideNav,
		SideNavItems,
		SideNavMenu,
		SideNavMenuItem,
		SideNavDivider,
		SkipToContent,
		Content,
		Grid,
		Row,
		Column,
		HeaderUtilities,
		HeaderGlobalAction
	} from 'carbon-components-svelte'
	import LogoGithub from 'carbon-icons-svelte/lib/LogoGithub.svelte'
	import { base } from '$app/paths'

	import 'carbon-components-svelte/css/g10.css'
	import '../styles/index.scss'
	import { goto } from '$app/navigation'
</script>

<!-- May need urls to start with {base}/ for GitHub -->
<Header platformName="Carbon Charts">
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderUtilities>
		<HeaderGlobalAction
			on:click={() => goto('https://github.com/carbon-design-system/carbon-charts')}
			aria-label="GitHub"
			icon={LogoGithub} />
	</HeaderUtilities>
</Header>

<SideNav isOpen={true}>
	<SideNavItems>
		<SideNavMenu text="Getting started" expanded={true}>
			<SideNavMenuItem href="{base}/" text="Introduction" />
			<SideNavMenuItem href="{base}/installation" text="Installation &amp setup" />
			<SideNavMenuItem href="{base}/anatomy" text="Chart anatomy" />
		</SideNavMenu>

		<SideNavDivider />

		<SideNavMenu text="Data &amp; configuration" expanded={true}>
			<SideNavMenuItem href="{base}/data" text="Tabular data format" />
			<SideNavMenuItem href="{base}/options" text="Chart options" />
			<SideNavMenuItem href="{base}/api" text="API" />
		</SideNavMenu>

		<SideNavDivider />

		<SideNavMenu text="Design" expanded={true}>
			<SideNavMenuItem href="{base}/themes" text="Themes (dark &amp; light)" />
			<SideNavMenuItem href="{base}/axes" text="Axes" />
			<SideNavMenuItem href="{base}/palette" text="Color Palette" />
			<SideNavMenuItem href="{base}/dashboards" text="Dashboards" />
		</SideNavMenu>

		<SideNavDivider />

		<SideNavMenu text="Chart types" expanded={true}>
			<SideNavMenuItem href="{base}/alluvial" text="Alluvial / Sankey" />
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
			<SideNavMenuItem href="{base}/radar" text="Radar / Kiviat" />
			<SideNavMenuItem href="{base}/scatter" text="Scatter" />
			<SideNavMenuItem href="{base}/tree" text="Tree" />
			<SideNavMenuItem href="{base}/treemap" text="Treemap" />
			<SideNavMenuItem href="{base}/wordcloud" text="Word cloud" />
		</SideNavMenu>
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
