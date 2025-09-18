export default [
	{
		path: 'introduction',
		title: 'Introduction',
		text: 'Carbon Charts is a component library of 26 charts for vanilla JavaScript, Svelte, React, Vue and Angular. Detailed documentation and StackBlitz examples are provided to get you up and running quickly. Components are highly customizable with advanced functionality such as themes, dual axes, color palettes, combo charts, and event handling. To get started, go to the Installation & setup page and select your preferred framework. Alternatively, jump ahead to StackBlitz examples in various frameworks provided for each of the chart types by clicking the icons below.',
		charts: []
	},
	{
		path: 'installation',
		title: 'Installation & setup',
		text: 'Details for each file in the example above: The HTML example above loads the UMD bundle and styles in the head of the document from https://unpkg.com (cdnjs is also available). JavaScript executes once the DOM has loaded. It gets the HTML id of the div that will contain the chart. It then passes the data and options to it. Example using SvelteKit The embedded example above uses a WebContainer optimized for Chromium-based browsers. To view it in your browser, click the Fork on StackBlitz button on the bottom left. Carbon Charts Svelte is unique among the component libraries because it is provided in source / unbundled form. This means when you build your Svelte app using it, you are compiling the source of Carbon Charts Svelte and its dependency, Carbon Charts. Carbon Charts expects to run in a browser environment. This will cause an error when using server-side rendering (SSR). To avoid this, configure Vite to prevent @carbon/charts from being externalized for SSR. vite.config.mjs Example using React Click Preview or Both on the lower left of the example to see the chart. The top-left icon (Project) allows you to browse all the files in the project. Example using Vue.js The embedded example uses a WebContainer optimized for Chromium-based browsers. To view it in your browser, click the Fork on StackBlitz button on the bottom left. For Vue.js 3+, use @carbon/charts-vue@next. For 2.7, use @carbon/charts-vue@latest. Example using Angular Click Preview or Both on the lower left of the example to see the chart. The top-left icon (Project) allows you to browse all the files in the project. For Angular 16+, use @carbon/charts-angular@next. For 6 to 15, use @carbon/charts-angular@latest. By default, Carbon Charts use IBM Plex Sans and IBM Plex Sans Condensed : To use different fonts, override two custom CSS properties for the CSS class that is automatically associated with the chart container like this...',
		charts: []
	},
	{
		path: 'anatomy',
		title: 'Chart anatomy',
		text: 'Most data visualizations are rectangular charts, with two dimensions represented on a vertical and a horizontal axis. Rectangular charts are typically constructed with a set of common elements including a legend, axis titles, and navigation tools like a zoom bar and tooltip. In a circular chart, labels offer the percentage value of the whole for an individual category. When the graphic translation of the data is less than 3 degrees, a callout is used to clearly associate the label with the slice. If the data translates as less than 1 degree, a slice will not be rendered on the chart, the data would not be keyboard accessible or available in a tooltip either. The only way to see the data in this scenario would be via a data table, a feature that we’d like to implement for all charts to enhance accessibility. A key performance indicator (KPI) consists of a number with a single word description. Examples include “15,250 browsers”, “\\$1.3M revenue”, or “Total 450”. A big number inside the donut chart may be used to display a total sum or the individual count of a slice upon interaction. This element can also be used independently on a dashboard (though please note this component is still a WIP and not available outside the donut chart).',
		charts: []
	},
	{
		path: 'data',
		title: 'Chart data',
		text: 'Carbon Charts uses a tabular data format. Each framework package exports a TypeScript type called ChartTabularData. This format accomodates all types of charts. Each element in the array is a datapoint. For ChartTabularData, dates may be provided in various formats: ISO-8601 date/time stamps, JavaScript Date objects and integers representing an epoch. These formats may be mixed in the data for a single chart. In the example above, the key property is the domainIdentifier used for axis labels. The value property is known as the rangeIdentifier. The domainIdentifier name defaults to the name key for string values and date for dates. The default name for the rangeIdentifier is value. While these default names may be used, the best practice is to explicitly set a mapsTo property in the chart options for each axis as shown below. Circular charts expect the rangeIdentifer to be "value". Grouping of data can be done via the chart options property data.groupMapsTo as shown below. Some types of charts support additional options related to the tabular data format. Bubble charts can use four properties per datapoint. The property bubble.radiusMapsTo configures the radius of the bubbles (default property name is "radius"). For Svelte, React, Vue and Angular, data is reactive. For vanilla JavaScript, updates to data must be made via ChartModel.setData().',
		charts: []
	},
	{
		path: 'options',
		title: 'Chart options',
		text: 'API guide for chart options. Options for all chart types extend from BaseChartOptions , ScatterChartOptions or AxisChartOptions. To see examples for each type of chart, navigate to Chart types on left. For Svelte, React, Vue and Angular, most options are reactive (with certain exceptions like positioning of the Legend and data grouping). For vanilla JavaScript, updates to options must be made via ChartModel.setOptions().',
		charts: []
	},
	{
		path: 'highlights',
		title: 'Highlights',
		text: 'Highlights can be added to put data in specific ranges into focus.',
		charts: []
	},
	{
		path: 'locales',
		title: 'Locales',
		text: 'Numbers and dates can be expressed in various locales.',
		charts: []
	},
	{
		path: 'thresholds',
		title: 'Thresholds',
		text: 'Thresholds can be added to charts with axes to communicate targets or limits.',
		charts: []
	},
	{
		path: 'toolbar',
		title: 'Toolbar',
		text: 'The optional toolbar can be customized.',
		charts: []
	},
	{
		path: 'truncation',
		title: 'Truncation',
		text: 'Carbon Charts automatically truncate long label names in axes and tooltips by adding an ellipsis.',
		charts: []
	},
	{
		path: 'zoombar',
		title: 'Zoom Bar',
		text: 'Carbon Charts can be configured to display a Zoom Bar above that provides drag handles permitting the user to focus on a particular portion of the x-axis data.',
		charts: []
	},
	{
		path: 'apidocs',
		title: 'API (Vanilla JavaScript)',
		text: 'Carbon Charts exposes the entire API allowing you to heavily customize the look and feel and behaviors. When a chart is instantiated, the chart object contains key properties. Services are globalized functions. General tasks such as event dispatching, transition handling, DOM-related activities etc. are handled by services. For example, event listeners can be added through the events service To listen for event just use a reference to the chart to add an event listener for one of the dispatched events above. This is an example for adding an event listener for a mouseover event on bar chart rects. Event dispatching for chart elements allows applications to trigger custom UI actions and states when users interact with the charts. More information on events can be found here.',
		charts: []
	},
	{
		path: 'analytics-instrumentation',
		title: 'Instrumenting Telemetry & Analytics',
		text: 'Carbon Charts provides an events service that can be leveraged to track user interactions and send telemetry data to analytics platforms like Amplitude. Below are examples of how to instrument your charts to gather user behavior data. To track interactions with your chart, use a reference to the chart to add event listeners for the dispatched events. The following example shows how to track legend clicks: Here are examples of events that could provide valuable user interaction data: For events that may fire frequently, such as tooltips or mouse movements, debouncing could be used to prevent overwhelming your analytics platform: When using Carbon Charts with React, you can set up event listeners using refs and useEffect: Event-based telemetry allows applications to gather valuable user behavior data without disrupting the user experience. More information on available event listeners can be found here.',
		charts: []
	},
	{
		path: 'event-listeners',
		title: 'Event Listeners',
		text: 'Services are globalized functions. General tasks such as event dispatching, transition handling, DOM-related activities etc. are handled by services. For example, event listeners can be added through the events service To listen for event just use a reference to the chart to add an event listener for one of the dispatched events above. This is an example for adding an event listener for a mouseover event on bar chart rects. Event dispatching for chart elements allows applications to trigger custom UI actions and states when users interact with the charts. More information on events can be found here.',
		charts: []
	},
	{
		path: 'themes',
		title: 'Themes',
		text: 'Four Carbon themes (white, g10, g90 and g100) are included in the styles.css file for each package. The latter three represent shades of gray where g10 is 10% and g100 is 100% (black). All chart types support the theme property. To use alternate background colors, set your options to a theme that is close in brightness to your background color such as g90 then override global CSS classes as shown below.',
		charts: []
	},
	{
		path: 'axes',
		title: 'Axes',
		text: 'Rectangular charts have a single x-axis and y-axis label by default. If you have datapoints with rangeIdentifiers (value) that represent two different units of measure (such as temperature and currency), it is best to display the data with dual axes. The following example shows options for a dual axis Line chart. The horizontal axis displays dates. The left vertical axis shows revenue and the right vertical axis shows attendees. The left axis is defined as the primary axis via the main property. The left and right axes have a correspondingDatasets property that represents an array of domainIdentifiers. Axis charts have a scaleType property for their axes. A value of "log" will display that axis using a logarithmic scale.  To start at zero, or not to start at zero. This is potentially history@apos;s longest debate. As a charting library, we would like to support both directions, with the following recommendation. Always start numerical axes at zero for part-to-whole and comparisons charts, such as bar and area chart. Truncating the Y axis can distort the perception, making a small difference look big and significant.  goodFor bar charts, the numerical axis should start at zero. bad When an axis starts at non-zero, percentage differences between bars are exaggerated.  Line charts and scatter plots are less sensitive to this distortion because they are intended to communicate trends and not the relative size of the difference. In these cases, cropping the y-axis helps users more easily identify the direction of change.  For line charts showing stock market activities, the existence of peaks and valleys in trends is more important than the true size of the change. Never interpolate between periods when data is unavailable. Always label both the start and end point during which data is not available.  Sometimes, it is useful to skip part of the axis to bring data on the extreme ends into view without distortion. When the axis contains a break, use a sinusoidal line to replace the straight axis line. On the x-axis, the break can be fluid with graph area size, with a minimum width of 1rem. On the y-axis, we recommend using a fixed distance of 1rem for the break. If data is available during an axis break, re-style line segments to use 0.5px stroke and hide circles representing data points.  If data isn’t available between axis breakpoints, leave the area empty.  Never change axis ticks increments to accommodate data availability. If any form of axis compression is required, use the provided axis break styling to visually denote the compression. In time series, x-axis labels reflect the time increment in the data. When possible, use localized date and time format, or user preference. Otherwise, the chart defaults to the format presented below. Whenever data crosses into a new time cycle, such as a new day, month, or year, semibold the label to make it a “landmark” label to provide additional context for the labels following it.  Example of a time series plotted at 15 seconds intervals',
		charts: []
	},
	{
		path: 'legends',
		title: 'Legends',
		text: 'Chart legends are auto-generated, allow filtering, can be displayed in various locations and in a custom order and have custom items added.',
		charts: []
	},
	{
		path: 'palettes',
		title: 'Color palettes',
		text: 'The color palette for data visualizations is a select subset of the IBM Design Language color palette. It is designed to maximize accessibility and harmony within a page. For additional details, see the Color Palettes section of the Carbon Design System. Color palettes for charts are set using the color property in options. By default, Carbon Charts assigns colors based on the number of data groups (eg. charts with four data groups will get the first of the 4-color palettes). Avoid using a color palette designed for a different number of data groups than the chart is rendering unless you have a variable number of data groups. A custom color range can be provided to be used within the color scale. To do this, define values for all data groups in your chart. If fewer data groups are provided than the chart contains, the chart will default to using the IBM Design Language data visualization color palette.',
		charts: []
	},
	{
		path: 'dashboards',
		title: 'Dashboards',
		text: "Context is everything. Dashboards will vary widely depending on the context they are designed for and must be carefully considered. Presentation dashboards show viewers the current status of key performance indicators (KPIs) relevant to the business problem. A good presentation dashboard provides a big-picture view of the data while serving as a guide for the audience to decide what areas they would like to focus on and explore. Examples include a car dashboard, a stock market ticker board, or a route map with the locations of nearby gas stations layered on top. Prioritize data by importance, then create a clear visual hierarchy. The most important data should have the highest contrast and occupy the largest area. Most people in the west read left to right, then top to bottom. This is known as the F-shaped pattern. Place the most important at the top of the page and follow the F-pattern for the remaining elements, finishing with the least important information. Non-essential information should be provided as needed. Design a dashboard to reduce a page's complexity by stripping away anything that could distract a user from interpreting the information. Always use consistent colors for each data set within a dashboard. White space either sets elements apart or brings them together to distinguish a point's priority. Space acts as a visual separator and guides a user's eye through a page. It provides relief and breathing room. According to research conducted by Human Factors International, white space increases comprehension by almost 20 percent. Exploration dashboards allow users to interact with the data to discover insights and identify patterns. Examples of actions a user may perform on data include search, sort and filter data, roll up, and drill down. Exploration dashboards are intended for people who seek to look beyond a primary view and have to be very interactive. Examples include financial reports with roll up and drill down capabilities or interactive maps that include zooming in and out. Others include business previews with a search bar and additional data available on demand like opening hours and reviews. All charts should use the same layout and spacing, and have legends in the same position relative to the charting area. Do not switch measurement systems, like imperial to metric. Mirror chart modifications like filter and zoom. When a user manipulates one chart, other charts showing related data sets should automatically update to provide multi-dimensional views of the user's action. Use annotations to highlight trends, averages, peaks, and valleys to provide additional information. Annotations should help users interpret fluctuations in the data. Avoid annotations that obstruct the view of data.",
		charts: []
	},
	{
		path: 'alluvial',
		title: 'Alluvial / Sankey Charts',
		text: 'Alluvial Charts, also known as Sankey diagrams, are specialized flow diagrams that illustrate how data records distribute across two indicators, effectively highlighting the relationships and correlations between these variables. These charts are particularly useful for visualizing the flow of quantities between different states or conditions, providing clear insights into the structure and dynamics of datasets. To create a comprehensive alluvial diagram, you can align multiple blocks, each representing a pair of indicators, side by side. This arrangement allows for the visualization of complex networks and relationships within larger datasets. However, it is important to note that Alluvial Charts are designed to show correlations only between directly connected indicators. Relationships between non-adjacent indicators are not typically depicted, which can limit their use in displaying broader interdependencies within the data. To enhance readability and differentiation, distinct color schemes are often used for each block. This color coding helps in distinguishing between different sections of the diagram, making it easier for viewers to follow the flow and distribution of data across various categories and indicators. Overall, Alluvial Charts are a powerful tool for representing interconnected data in a clear and visually engaging manner. Details on Alluvial chart options can be found here.',
		charts: [
			'Basic',
			'Gradient',
			'Multiple Categories',
			'Monochrome with Custom Node Padding',
			'Aligned Nodes',
			'Custom Colors'
		]
	},
	{
		path: 'area',
		title: 'Area Charts',
		text: "Area Charts are a type of graph used to visualize quantitative data graphically. They are similar to line charts but emphasize the volume beneath the line by filling the area between the axis and the line with color or a pattern. This filled area helps to highlight the magnitude of values over time, making Area Charts particularly useful for showing trends in data at a glance, such as profits, stock volumes or demographic information over intervals. These charts are beneficial for comparing multiple datasets to see how volumes change over time relative to each other. For instance, they can effectively illustrate the growth of multiple product lines in a business or fluctuations in resource usage in different departments. In designing Area Charts, it's essential to maintain clear, uncluttered visuals, especially when dealing with multiple overlapping areas. Options such as stacking the areas (Stacked Area Charts) or normalizing the data to show proportional relationships (Percent Area Charts) can provide different perspectives and insights into the data, depending on the specific requirements of the analysis. Area Charts offer an intuitive and visually impactful way to present cumulative data series, making complex information more accessible and easier to understand. Details on Area chart options can be found here. Stacked area charts are useful for comparing proportional contributions within a category. They plot the relative value that each data series contributes to the total.",
		charts: [
			'Time Series',
			'2023 Annual Sales Figures',
			'Conversion rate',
			'Time Series (Natural Curve)',
			'2023 Annual Sales Figures',
			'Discrete Domain',
			'2023 Annual Sales Figures',
			'Conversion rate',
			'Time Series (Natural Curve, Bounded)',
			'2023 Annual Sales Figures',
			'Skeleton',
			'No Data',
			'Multiple Bounded Areas (Natural Curve)',
			'2023 Annual Sales Figures',
			'Sparkline',
			'2019 Annual Sales Figures',
			'Time Series',
			'Time Series (Percentage)',
			'Time Series (Uneven Data)',
			'Vertical stacked area (time series) w/toolbar override'
		]
	},
	{
		path: 'bar',
		title: 'Bar Charts',
		text: 'Bar Charts are a staple in data visualization, useful for comparing quantities across different categories. This component library allows for the creation of simple, grouped, and stacked bar charts to suit various data presentation needs. Details on Bar chart options can be found here.',
		charts: [
			'Vertical simple bar (discrete)',
			'Custom colors (simple bar)',
			'Custom legend order (simple bar)',
			'Additional legend items (simple bar)',
			'Custom ticks (simple bar)',
			'Centered legend (simple bar)',
			'Custom domain (simple bar)',
			'Horizontal simple bar (discrete)',
			'Horizontal simple bar (centered legend)',
			'Truncated labels (simple bar)',
			'Vertical simple bar (time series)',
			'Turkish locale',
			'Arabic locale',
			'Iranian locale',
			'Japanese locale',
			'Hindi locale',
			'Bangla locale',
			'Horizontal simple bar (time series)',
			'Vertical simple bar (time series - dense data, Turkish)',
			'Horizontal floating bar (time series)',
			'Vertical simple bar (empty state)',
			'Vertical simple bar (skeleton)',
			'Horizontal simple bar (empty state)',
			'Horizontal simple bar (skeleton)',
			'Floating vertical bar (discrete)',
			'Floating horizontal bar (discrete)',
			'Pre-selected groups (grouped bar)',
			'Vertical grouped bar (discrete)',
			'Vertical grouped bar (time series)',
			'Horizontal grouped bar (time series)',
			'Vertical grouped bar (time series - dense data)',
			'Vertical grouped bar (empty state)',
			'Vertical grouped bar (skeleton)',
			'Horizontal grouped bar (empty state)',
			'Horizontal grouped bar (skeleton)',
			'Horizontal grouped bar (discrete)',
			'Vertical stacked bar (discrete)',
			'Vertical stacked bar (divergent)',
			'Horizontal stacked bar (discrete)',
			'Vertical stacked bar (time series)',
			'Vertical stacked bar (short interval time series)',
			'Custom ticks (stacked bar)',
			'Horizontal stacked bar (time series)',
			'Vertical stacked bar (empty state)',
			'Vertical stacked bar (skeleton)',
			'Horizontal stacked bar (empty state)',
			'Horizontal stacked bar (skeleton)'
		]
	},
	{
		path: 'boxplot',
		title: 'Boxplot Charts',
		text: 'Boxplots, or box-and-whisker diagrams, offer a concise visualization of data distribution through a five-number summary: minimum, first quartile (Q1), median, third quartile (Q3) and maximum. These charts are ideal for identifying differences between groups, spotting outliers and understanding data spread and skewness. Boxplots are particularly useful in exploratory data analysis, helping to compare distributions across categories clearly and effectively. Their integration into modern data visualization environments ensures they are both accessible and responsive, suitable for detailed statistical displays. Details on Boxplot chart options can be found here.',
		charts: ['Horizontal box plot', 'Vertical box plot']
	},
	{
		path: 'bubble',
		title: 'Bubble Charts',
		text: "Bubble Charts are a dynamic way to display three dimensions of data on a plot, where each point has values for the x-axis, y-axis, and a third dimension represented by the bubble's size. This type of chart is effective for comparing and visualizing the relationships between numerical variables, where the bubble sizes can highlight the magnitude of a third variable in addition to the standard x and y axes positioning. Bubble Charts are particularly useful for displaying a large volume of data points simultaneously in a way that is both visually engaging and easy to interpret. They are ideal for sectors such as economics, finance, and social sciences, where understanding complex interdependencies in data is crucial. Their intuitive layout helps in spotting correlations and trends effectively, making Bubble Charts a valuable tool in the arsenal of data visualization techniques. Details on Bubble chart options can be found here.",
		charts: [
			'Bubble (linear)',
			'No. of employees',
			'Annual sales',
			'Bubble (discrete)',
			'2023 Annual Sales Figures',
			'Bubble (time series)',
			'2023 Annual Sales Figures',
			'Bubble (empty state)',
			'No. of employees',
			'Annual sales',
			'Bubble (skeleton)',
			'No. of employees',
			'Annual sales',
			'Bubble (dual discrete axes)',
			'Problems',
			'Products'
		]
	},
	{
		path: 'bullet',
		title: 'Bullet Charts',
		text: 'Bullet Charts provide a clear and compact way to display performance data by comparing a primary measure to one or more other measures and qualitative ranges, such as poor, satisfactory, and excellent. This type of chart is effective for offering a quick snapshot of data in the context of set performance goals or benchmarks. Originally designed as an alternative to more complex dashboard gauges and meters, Bullet Charts are particularly useful for enhancing dashboard readability and efficiency. They are commonly used in business to illustrate performance, such as reaching sales targets or production levels, and can also serve well in any context where space is limited and a quick visual assessment is beneficial. With their straightforward design, Bullet Charts allow for immediate interpretation of positional and contextual data, making them a versatile tool in data visualization. Details on Bullet chart options can be found here.',
		charts: ['Basic bullet', 'Item E', 'Item D', 'Item C', 'Item B', 'Item A']
	},
	{
		path: 'choropleth',
		title: 'Choropleth Charts',
		text: 'Choropleth Charts are specialized maps that use variations in shading, coloring, or patterning within predefined areas to represent the magnitude of a statistical variable. This type of chart is particularly effective for visualizing geographic data distributions, allowing for easy comparisons across different regions or territories. Commonly used to represent variables such as population density, economic metrics, or election results, Choropleth Charts provide a clear visual distinction between different data intensities. They are invaluable in fields such as demographics, public policy, and epidemiology, where geographic patterns play a crucial role in data analysis. The intuitive nature of these charts makes complex data sets accessible and understandable, highlighting spatial relationships and trends that might not be as apparent in other forms of data representation. Choropleth Charts are a fundamental tool in the visualization toolkit for anyone looking to convey geographic data insights effectively. Details on Choropleth chart options can be found here.',
		charts: ['Geo data', 'Missing data', 'Custom colors']
	},
	{
		path: 'circlepack',
		title: 'Circle Pack Charts',
		text: "Circle Pack Charts are a visually striking form of data visualization that use nested circles to represent hierarchical data. Each circle's size and nesting level depict different layers of the hierarchy, making complex organizational structures or data sets comprehensible at a glance. This type of chart is particularly effective for displaying proportions within each level of the hierarchy, offering insights into the relative size and importance of each element. Common applications of Circle Pack Charts include visualizing corporate structures, biological classifications, or website structures. These charts are useful in any field where understanding the composition and relationships within a large, complex set of data is crucial. The compact and encapsulated format of Circle Pack Charts not only saves space but also enhances the viewer's ability to detect patterns and anomalies across different levels of data. Overall, Circle Pack Charts provide a unique and intuitive way to explore and present nested data visually. Details on Circle Pack chart options can be found here.",
		charts: [
			'Two Levels Hierarchy',
			'Custom colors (circle pack)',
			'One Level Hierachy',
			'Three Levels Hierarchy (monchromatic)',
			'Three Levels Hierarchy (No Zoom)',
			'Three Levels Hierarchy'
		]
	},
	{
		path: 'combo',
		title: 'Combo Charts',
		text: 'Combo Charts provide a versatile visualization tool that combines different types of graphs into a single integrated display, allowing for a multifaceted analysis of datasets. This type of chart is particularly useful for presenting complementary or contrasting data types simultaneously, such as combining bar graphs with line graphs. The Combo Chart enables users to visually compare different measures and track their relationships, making it ideal for highlighting trends, variances, and performance metrics across various data dimensions. Its ability to overlay multiple chart types on a single grid enhances the clarity and depth of data interpretation, supporting better-informed decision-making processes in business and research contexts. Details on Combo chart options can be found here.',
		charts: [
			'Combo (Line + Simple bar) - custom configs',
			'USA Summer School Attendance',
			'Temperature (°F)',
			'Day of the Week',
			'Combo (Line + Floating bar)',
			'USA Summer School Attendance',
			'Temperature (°F)',
			'Day of the Week',
			'Horizontal Combo (Line + Simple bar)',
			'USA Summer School Attendance',
			'Temperature (°F)',
			'Day of the Week',
			'Combo (Line + Stacked bar)',
			'Disney Park Attendance',
			'2018 Annual Sales Figures',
			'Temperature (°C)',
			'Combo (Line + Grouped bar) - custom configs',
			'Sales',
			'Temperature (°C)',
			'Combo Horizontal (Line + Grouped bar)',
			'Sales',
			'Temperature (°C)',
			'Combo (Line + Area)',
			'Score',
			'Temperature (°C)',
			'Combo (Line + Scatter + Bar)',
			'Attendance',
			'Temperature (°C)',
			'Combo Chart (empty)',
			'Attendance',
			'Temperature (°C)',
			'Combo Chart (loading)',
			'Attendance',
			'Temperature (°C)',
			'Combo (Stacked Area + Line)',
			'left',
			'right',
			'Combo (Line + Area) Time series',
			'Score',
			'Temperature (°C)'
		]
	},
	{
		path: 'donut',
		title: 'Donut Charts',
		text: 'Donut charts are a type of circular statistical graphic, similar to pie charts, but with a central hole. They display data in a ring shape, where the arc length of each slice corresponds to the proportion of the whole it represents. The central area of the chart remains empty, allowing for additional information or annotations. Donut charts are often used to illustrate the breakdown of a whole into its constituent parts, making it easy to compare the relative sizes of different categories at a glance. They are popular for displaying data sets with a small number of categories and are commonly employed in business presentations, financial reports, and dashboards for their simplicity and visual appeal. Details on Donut chart options can be found here.',
		charts: [
			'Donut',
			'Donut (centered)',
			'Donut (value maps to count)',
			'Donut (empty state)',
			'Donut (skeleton)'
		]
	},
	{
		path: 'gauge',
		title: 'Gauge Charts',
		text: 'Gauge charts, also known as dial or speedometer charts, are visualizations used to represent a single value within a specific range, typically depicting it against a scale marked with different levels or categories. Resembling the dashboard of a vehicle, these charts feature a circular or semicircular layout, with an indicator pointing to the value being measured. The position of the indicator relative to the scale provides an immediate visual indication of whether the value falls within certain predefined ranges, such as low, medium, or high. Gauge charts are often employed in performance monitoring, goal tracking, and Key Performance Indicator (KPI) reporting, offering a quick and intuitive way to assess progress or status at a glance. However, they should be used judiciously, as they can sometimes oversimplify data and may not be suitable for displaying complex datasets. Details on Gauge Chart options can be found here.',
		charts: [
			'Gauge semicircular -- danger status',
			'Gauge circular -- warning status',
			'Gauge circular without delta -- custom color'
		]
	},
	{
		path: 'heatmap',
		title: 'Heatmap Charts',
		text: 'Heatmap charts are graphical representations of data where values in a matrix are represented as colors. Typically, the data is arranged in a table format, with rows and columns representing different categories or variables. Each cell in the table is assigned a color based on its value, allowing patterns and trends to be easily visualized. Heatmaps are particularly useful for identifying areas of concentration, variation, or correlation within large datasets, as the intensity of color indicates the magnitude of the values. They are commonly used in fields such as data analysis, biology, finance, and web analytics to visualize complex data sets, detect outliers, and reveal underlying patterns that might not be apparent in traditional tabular formats. Heatmap charts provide an intuitive and efficient way to explore and interpret multidimensional data, making them valuable tools for decision-making and data-driven insights. Details on Heatmap Chart options can be found here.',
		charts: [
			'Heatmap',
			'Letters',
			'Months',
			'Legend title',
			'Heatmap (Quantize legend)',
			'Letters',
			'Months',
			'Legend title',
			'Heatmap (Divergent)',
			'Legend title',
			'Heatmap (Axis order option)',
			'Letters',
			'Months',
			'Legend title',
			'Heatmap (Missing data)',
			'Letters',
			'Months',
			'Legend title'
		]
	},
	{
		path: 'histogram',
		title: 'Histogram Charts',
		text: 'Histogram charts are graphical representations of the distribution of numerical data. They consist of a series of adjacent rectangles, or bins, where the width of each bin represents a range of values, and the height represents the frequency or count of data points falling within that range. The bins are usually arranged along a horizontal axis, with the frequency of occurrence plotted along the vertical axis. Histograms provide a visual summary of the distribution of data, allowing users to quickly identify patterns, trends, and outliers. They are commonly used in fields such as statistics, data analysis, and quality control to explore the underlying characteristics of a dataset, including central tendency, dispersion, and skewness. Histogram charts are valuable tools for understanding the shape and spread of data distributions, aiding in decision-making, hypothesis testing, and identifying areas for further investigation. Details on Histogram Chart options can be found here.',
		charts: [
			'Histogram (linear)',
			'Age',
			'No. of participants',
			'Histogram (defined bins number) (linear)',
			'US $ (million)',
			'No. of transactions',
			'Histogram (defined bins) (linear)',
			'Age',
			'No. of participants'
		]
	},
	{
		path: 'line',
		title: 'Line Charts',
		text: 'Line charts are graphical representations of data points connected by straight lines. They are commonly used to display trends or patterns over time or across different categories. In a line chart, the horizontal axis typically represents the independent variable, such as time or categories, while the vertical axis represents the dependent variable, such as numerical values or frequencies. Each data point is plotted as a marker, and the lines connecting them provide a visual representation of the progression or relationship between the data points. Line charts are particularly effective for illustrating trends, fluctuations, or correlations in data, making them valuable tools for data analysis, forecasting, and communication. They are widely used in fields such as finance, economics, science, and engineering to visualize time-series data, track performance metrics, and communicate insights to stakeholders. Line charts offer a clear and concise way to convey complex information, enabling users to make informed decisions and derive actionable insights from their data. Details on Line Chart options can be found here.',
		charts: [
			'Line (discrete)',
			'2023 Annual Sales Figures',
			'Conversion rate',
			'Truncated labels (line)',
			'2023 Annual Sales Figures',
			'Conversion rate',
			'Custom domain (line)',
			'2023 Annual Sales Figures',
			'Conversion rate',
			'Pre-selected groups (line)',
			'2023 Annual Sales Figures',
			'Conversion rate',
			'Custom colors (line)',
			'2023 Annual Sales Figures',
			'Conversion rate',
			'Line (time series)',
			'2023 Annual Sales Figures',
			'Conversion rate',
			'Thresholds (line)',
			'2023 Annual Sales Figures',
			'Conversion rate',
			'Line (dense time series)',
			'2023 Annual Sales Figures',
			'Conversion rate',
			'Rotated ticks (line)',
			'Log Axis',
			'Line (empty state)',
			'2023 Annual Sales Figures',
			'Conversion rate',
			'Line (skeleton)',
			'2023 Annual Sales Figures',
			'Conversion rate',
			'Line + Line (dual axes)',
			'Temperature (°C)',
			'Date',
			'Rainfall (mm)',
			'Left aligned vertical legend (line)',
			'2023 Annual Sales Figures',
			'Conversion rate',
			'Line (time series) - Time interval monthly with French locale',
			'Line (time series) - 15 second interval',
			'Line (time series) - Time interval minute',
			'Line (time series) - Time interval 30minutes',
			'Line (time series) - Time interval daily',
			'Line (time series) - Time interval weekly',
			'Line (time series) - Time interval monthly',
			'Line (time series) - Time interval quarterly',
			'Line (time series) - Time interval override',
			'Line (time series) - Time interval yearly',
			'Line (time series) - Single datum',
			'Line (time series) - addSpaceOnEdges = 0',
			'Line (time series) - Two identical labels',
			'Line (time series) - two icons',
			'2019 Annual Sales Figures',
			'Conversion rate',
			'Line (time series) - All labels in primary format'
		]
	},
	{
		path: 'lollipop',
		title: 'Lollipop Charts',
		text: 'Lollipop charts blend the simplicity of dot plots with the structure of bar charts. They use markers connected to a categorical axis by lines, creating a "lollipop" appearance. These charts effectively highlight individual data points while still showing their magnitude relative to others. They\'re useful in data visualization and analysis for emphasizing specific values within a dataset and are commonly used across various fields to communicate insights and trends visually. Details on Lollipop Chart options can be found here.',
		charts: [
			'Lollipop (discrete)',
			'2019 Annual Sales Figures',
			'Lollipop (horizontal) - presentation',
			'2019 Annual Sales Figures'
		]
	},
	{
		path: 'meter',
		title: 'Meter Charts',
		text: 'Meter Charts are a visual representation where a single value is depicted along a horizontal line, often with reference points or thresholds indicating different levels. The position of the value on the line provides a clear indication of its magnitude relative to the range represented by the line. This type of meter chart is commonly used to display values such as progress towards a goal, satisfaction scores, or performance metrics. It offers a simple and intuitive way to assess where a value stands in relation to predefined benchmarks or targets. Meter Charts are frequently employed in dashboard design, reporting, and monitoring systems to provide stakeholders with a quick and easy-to-understand snapshot of key metrics or indicators. Details on Meter Chart options can be found here.',
		charts: [
			'Meter Chart - with statuses',
			'Meter Chart - statuses and custom color',
			'Meter Chart - no status',
			'Proportional Meter Chart',
			'Proportional Meter Chart - peak and statuses',
			'Proportional Meter Chart (truncated)'
		]
	},
	{
		path: 'diagram',
		title: 'Network Diagrams',
		text: 'Carbon Charts Diagrams for React and Angular includes components that enable you to create diagrams using the Carbon Design System styling. These include:',
		charts: []
	},
	{
		path: 'pie',
		title: 'Donut Charts',
		text: "Pie Charts are a classic form of circular statistical visualization, where data is presented in a circular shape, divided into slices to represent different categories or proportions. Each slice's size corresponds to the proportion of the whole it represents, making it easy to compare relative values at a glance. Unlike donut charts, pie charts do not have a central hole and utilize the entire circle to display data. They are commonly used to illustrate the composition of a whole and highlight the distribution of various categories within it. Pie charts are favored for their simplicity and effectiveness in conveying information, making them a popular choice for presentations, reports, and visualizations across various fields such as business, finance, and academia. Details on Pie Chart options can be found here.",
		charts: [
			'Pie',
			'Pie (centered)',
			'Pie (value maps to count)',
			'Pie (empty state)',
			'Pie (skeleton)'
		]
	},
	{
		path: 'radar',
		title: 'Radar Charts',
		text: 'Radar Charts, also known as spider or Kiviat charts, are graphical representations of multivariate data on a two-dimensional plane. They feature a circular shape with multiple spokes extending from a central point, each representing a different variable or category. Data points are plotted along these spokes and connected to form a polygon, allowing for the comparison of multiple variables across different categories simultaneously. Radar charts are particularly useful for visualizing patterns, trends, and relationships in data with multiple dimensions. They are commonly employed in fields such as performance evaluation, market analysis, and sports analytics to assess strengths and weaknesses across various attributes or criteria. Radar charts offer a holistic view of complex data sets, enabling users to identify patterns and make informed decisions based on the relationships between different variables. Details on Radar Chart options can be found here.',
		charts: ['Radar', 'Radar (centered)', 'Radar - Missing datapoints', 'Radar - Dense']
	},
	{
		path: 'scatter',
		title: 'Scatter Charts',
		text: 'Scatter Charts are graphical representations of data points plotted on a two-dimensional coordinate system. Each data point is represented by a marker, such as a dot or a symbol, with its position determined by the values of two variables. One variable is plotted along the horizontal axis (x-axis), while the other variable is plotted along the vertical axis (y-axis). Scatter charts are particularly useful for visualizing the relationship or correlation between two variables. They allow analysts to identify patterns, trends, or clusters within the data and assess the strength and direction of the relationship between the variables. Scatter charts are commonly used in fields such as statistics, engineering, and social sciences for exploratory data analysis, hypothesis testing, and predictive modeling. They provide a powerful tool for gaining insights into the nature of relationships between variables and making data-driven decisions based on observed patterns. Details on Scatter Chart options can be found here.',
		charts: [
			'Scatter (linear x & y)',
			'No. of employees',
			'Annual sales',
			'Scatter (discrete)',
			'2019 Annual Sales Figures',
			'Scatter (time series)',
			'2019 Annual Sales Figures',
			'Scatter (empty state)',
			'2019 Annual Sales Figures',
			'Scatter (skeleton)',
			'2019 Annual Sales Figures',
			'Scatter (dual axes)',
			'order count',
			'product count'
		]
	},
	{
		path: 'tree',
		title: 'Tree Charts',
		text: 'Tree Charts, also known as dendrograms, are hierarchical visualizations that represent relationships between data points in a branching structure. They are commonly used in the field of hierarchical clustering to illustrate the arrangement of items based on their similarities or dissimilarities. In a tree chart, each data point is represented as a leaf node, while branches connect these nodes to form a tree-like structure. The length and position of branches convey the degree of similarity between data points, with shorter distances indicating greater similarity. Tree Charts are particularly effective for visualizing complex relationships and hierarchical structures within datasets. They provide a clear and intuitive way to explore clusters, subclusters, and the overall organization of data. Tree charts are widely used in fields such as biology, data mining, and information visualization for tasks such as taxonomic classification, gene expression analysis, and document clustering. They offer valuable insights into the structure and organization of data, aiding in pattern recognition, decision-making, and knowledge discovery. Details on Tree Chart options can be found here.',
		charts: ['Tree', 'Dendrogram']
	},
	{
		path: 'treemap',
		title: 'Treemap Charts',
		text: 'Treemap charts are hierarchical visualizations that represent hierarchical data structures using nested rectangles. Each rectangle, or "tile," in the treemap represents a hierarchical level, with the size of the tile proportional to a specific metric, such as the relative weight or value of each category or subcategory. The hierarchical structure is depicted by nesting smaller rectangles within larger ones, with each level representing a different category or subcategory. Treemap charts are particularly effective for visualizing and comparing the distribution of data across hierarchical levels. They provide an intuitive way to identify patterns, trends, and outliers within large and complex datasets. Treemap charts are commonly used in fields such as finance, market research, and data analysis for tasks such as visualizing portfolio allocations, analyzing website traffic, and exploring the composition of product sales. They offer a powerful tool for gaining insights into the hierarchical structure of data and making data-driven decisions based on observed patterns and relationships. Details on Treemap Chart options can be found here.',
		charts: ['Treemap', 'Treemap (Custom colors)']
	},
	{
		path: 'wordcloud',
		title: 'Word Cloud Charts',
		text: 'Word cloud charts visually represent text data by displaying words in varying sizes based on their frequency or importance within the text, offering an intuitive way to identify key themes or sentiments. Commonly used in social media analysis, content analysis, and market research, they provide a visually engaging method for summarizing textual information and exploring data sets. These charts highlight prominent terms and concepts, aiding in the identification of trends and insights within the text, making them a valuable tool for data exploration and communication. Details on WordCloud Chart options can be found here.',
		charts: ['Word Cloud']
	}
]
