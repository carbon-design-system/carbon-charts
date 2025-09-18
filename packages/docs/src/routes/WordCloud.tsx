import { WordCloudChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/wordcloud'
import '@carbon/charts-react/styles.css'

export default function WordCloud() {
	return (
		<>
			<PageHeader title="Word Cloud Charts" />

			<p>
				Word cloud charts visually represent text data by displaying words in varying sizes based on
				their frequency or importance within the text, offering an intuitive way to identify key
				themes or sentiments. Commonly used in social media analysis, content analysis, and market
				research, they provide a visually engaging method for summarizing textual information and
				exploring data sets. These charts highlight prominent terms and concepts, aiding in the
				identification of trends and insights within the text, making them a valuable tool for data
				exploration and communication.
			</p>

			<p>
				Details on WordCloud Chart options can be found{' '}
				<a href="/api/interfaces/WordCloudOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<WordCloudChart data={example.data} options={example.options} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
