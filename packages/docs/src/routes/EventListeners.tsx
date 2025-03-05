import { useEffect } from 'react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import { CodeSnippet, ListItem, UnorderedList } from '@carbon/react/es'
import PageHeader from '../components/PageHeader'

export default function EventListeners() {
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
			<PageHeader title="Event Listeners" />

			<p>
				Services are globalized functions. General tasks such as event dispatching, transition
				handling, DOM-related activities etc. are handled by services. For example, event listeners
				can be added through the events service
			</p>

			<p>
				To listen for event just use a reference to the chart to add an event listener for one of
				the dispatched events above. This is an example for adding an event listener for a mouseover
				event on bar chart rects.
			</p>

			<CodeSnippet className="language-javascript">{`barChart.services.events.addEventListener("bar-mouseover", e => console.log(e.detail))`}</CodeSnippet>

			<p>
				Event dispatching for chart elements allows applications to trigger custom UI actions and
				states when users interact with the charts. More information on events can be found{' '}
				<a href="/api/modules/interfaces.events" target="_blank">
					here
				</a>
				.
			</p>

			<h3>Code Examples</h3>
			<UnorderedList>
				<ListItem>
					<a
						href="https://stackblitz.com/edit/751z9aet?file=index.js%3AL17"
						target="_blank"
						rel="nofollow">
						vanilla
					</a>
				</ListItem>
				<ListItem>
					<a
						href="https://stackblitz.com/edit/react-uwtozmsz?file=src%2Findex.js%3AL17"
						target="_blank"
						rel="nofollow">
						React
					</a>
				</ListItem>
			</UnorderedList>
		</>
	)
}
