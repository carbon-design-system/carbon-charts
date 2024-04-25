import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import DiagramSimpleStatic from '../components/DiagramSimpleStatic'
import '@carbon/charts-react/styles.css'

export default function Diagram() {
	return (
		<>
			<PageHeader title="Diagrams" />

			<p>
				Diagram components are available for React and Angular. You can use these components
				alongside graphing libraries, or by composing your own layouts (see section 3).
			</p>

			<h3>1. A simple composed diagram, using statically defined x and y coordinates</h3>

			<DiagramSimpleStatic/>

			<StackBlitzLauncherExplanation />

			<h2>Examples for supported frameworks</h2>
		</>
	)
}
