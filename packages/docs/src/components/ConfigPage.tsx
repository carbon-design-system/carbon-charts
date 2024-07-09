import PageHeader from './PageHeader'
import ConfigExamples from './ConfigExamples'

interface UtilityExampleProps {
	title: string
	overview: string
	tag: string
}

export default function UtilityExample({ title, overview, tag }: UtilityExampleProps) {
	return (
		<>
			<PageHeader title={title} />

			<h2>Overview</h2>

			<p>{overview}</p>

			<ConfigExamples tag={tag} />
		</>
	)
}
