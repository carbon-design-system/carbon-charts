import { AreaChart, StackedAreaChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import { chartTypes, examples } from '../lib/area/examples'
import { chartTypesStacked, examplesStacked } from '../lib/area/examplesStacked'
import '@carbon/charts-react/styles.css'
import './Area.scss'

export default function Area() {
  return (
    <>
      <PageHeader title="Area Charts" />

      <p>
        Area charts are similar to line charts but with areas below the lines filled with colors or
        patterns.
      </p>

      <h2 id="basic">Basic</h2>

      {examples.map((example, index) => (
        <p key={index} className="chart">
          <AreaChart data={example.data} options={example.options} />
          <StackBlitzLauncher example={example} chartTypes={chartTypes} />
        </p>
      ))}

      <h2 id="stacked">Stacked</h2>

      <p>
        Stacked area charts are useful for comparing proportional contributions within a category. They
        plot the relative value that each data series contributes to the total.
      </p>

      {examplesStacked.map((example, index) => (
        <p key={index} className="chart">
          <StackedAreaChart data={example.data} options={example.options} />
          <StackBlitzLauncher example={example} chartTypes={chartTypesStacked} />
        </p>
      ))}
    </>
  )
}