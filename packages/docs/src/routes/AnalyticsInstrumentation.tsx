import { useEffect } from 'react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import { CodeSnippet } from '@carbon/react/es'
import PageHeader from '../components/PageHeader'

export default function AnalyticsInstrumentation() {
	const highlightCode = () => {
		hljs.registerLanguage('javascript', javascript)

		const nodes = document.querySelectorAll('pre code')
		nodes.forEach(el => {
			hljs.highlightElement(el as HTMLElement)
		})
	}

	useEffect(() => {
		highlightCode()
	})

	return (
		<>
			<PageHeader title="Instrumenting Telemetry & Analytics" />

			<p>
				Carbon Charts provides an events service that can be leveraged to track user interactions
				and send telemetry data to analytics platforms like Amplitude. Below are examples of how to
				instrument your charts to gather user behavior data.
			</p>

			<h2>Basic Telemetry Setup</h2>

			<p>
				To track interactions with your chart, use a reference to the chart to add event listeners
				for the dispatched events. The following example shows how to track legend clicks:
			</p>

			<CodeSnippet className="language-javascript" type="multi">{`// Initialize Amplitude
amplitude.init("YOUR_AMPLITUDE_API_KEY")

// Track legend interactions
chart.services.events.addEventListener("legend-item-onclick", ({ detail }) => {
  amplitude.track("Chart_LegendClick", {
    chartId: "sales-dashboard-main",
    toggledSeries: detail.selection
  })
})`}</CodeSnippet>

			<h2>Common Events To Track</h2>

			<p>Here are examples of events that could provide valuable user interaction data:</p>

			<CodeSnippet className="language-javascript" type="multi">{`// Track bar clicks
chart.services.events.addEventListener("bar-click", ({ detail }) => {
  amplitude.track("Chart_BarClick", {
    group: detail.datum.group,
    value: detail.datum.value
  })
})

// Track when charts finish rendering
chart.services.events.addEventListener("render-finished", ({ detail }) => {
  amplitude.track("Chart_Rendered", {
    renderTime: // number of seconds it took to render the chart
  })
})

// Track tooltip interactions
chart.services.events.addEventListener("show-tooltip", ({ detail }) => {
  amplitude.track("Chart_TooltipView", {
    data: detail.data
  })
})`}</CodeSnippet>

			<h2>Debouncing High-Frequency Events</h2>

			<p>
				For events that may fire frequently, such as tooltips or mouse movements, debouncing could
				be used to prevent overwhelming your analytics platform:
			</p>

			<CodeSnippet className="language-javascript" type="multi">{`import { debounce } from "lodash"

// Create debounced tracking function
const debouncedTrack = debounce((eventName, eventData) => {
  amplitude.track(eventName, eventData)
}, 300)

// Apply to tooltip events
chart.services.events.addEventListener("show-tooltip", ({ detail }) => {
  debouncedTrack("Chart_TooltipView", {
    data: detail.data
  })
})`}</CodeSnippet>

			<h2>React Integration Pattern</h2>

			<p>
				When using Carbon Charts with React, you can set up event listeners using refs and
				useEffect:
			</p>

			<CodeSnippet
				className="language-javascript"
				type="multi">{`import { BarChart } from "@carbon/charts-react"
import { useRef, useEffect } from "react"
import amplitude from "amplitude-js"

function InstrumentedChart({ data, options }) {
  const chartRef = useRef(null)
  
  // Set up event tracking
  useEffect(() => {
    if (chartRef.current) {
      const events = chartRef.current.chart.services.events
      
      // Track bar clicks
      events.addEventListener("bar-click", ({ detail }) => {
        amplitude.track("Chart_BarClick", {
          group: detail.datum.group,
          value: detail.datum.value
        })
      })
      
      // Track render completion
      events.addEventListener("render-finished", ({ detail }) => {
        amplitude.track("Chart_Rendered", {
          renderTime: // number of seconds it took to render the chart
        })
      })
    }
    
    // Clean up event listeners
    return () => {
      if (chartRef.current) {
        const events = chartRef.current.chart.services.events
        
        events.removeEventListener("bar-click", handleBarClick)
        events.removeEventListener("render-finished", handleRenderFinished)
      }
    }
  }, [chartRef])

  return (
    <BarChart
      ref={chartRef}
      data={data}
      options={options}
    />
  )
}`}</CodeSnippet>

			<p>
				Event-based telemetry allows applications to gather valuable user behavior data without
				disrupting the user experience. More information on available event listeners can be found{' '}
				<a href="/api/modules/interfaces.events" target="_blank">
					here
				</a>
				.
			</p>
		</>
	)
}
