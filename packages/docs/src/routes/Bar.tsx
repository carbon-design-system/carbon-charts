import { useState, useEffect } from 'react'
import {
  Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs } from '@carbon/react'
import { SimpleBarChart, GroupedBarChart, StackedBarChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/bar/examples'
import { chartTypesGrouped, examplesGrouped } from '../lib/bar/examplesGrouped'
import { chartTypesStacked, examplesStacked } from '../lib/bar/examplesStacked'

import '@carbon/charts-react/styles.css'

export default function Bar() {
	const [selectedIndex, setSelectedIndex] = useState(0)

  const handleTabChange = (evt: { selectedIndex: number }) => {
		setSelectedIndex(evt.selectedIndex)
	}

  useEffect(() => {
	}, [selectedIndex])

	return (
		<>
			<PageHeader title="Bar Charts" />

			<p>
        Details on Bar chart options can be found <a
          href="https://charts.carbondesignsystem.com/documentation/interfaces/interfaces.BarChartOptions.html"
          target="_blank">here</a>.
      </p>

			<StackBlitzLauncherExplanation/>

			<Tabs selectedIndex={selectedIndex} onChange={handleTabChange}>
        <TabList aria-label="List of bart chart types">
          <Tab>Vertical &amp; Horizontal</Tab>
					<Tab>Grouped</Tab>
          <Tab>Stacked</Tab>
        </TabList>

        <TabPanels>
						<TabPanel>
              {examples.map((example, index) => (
                <p key={index} className="chart">
                  <SimpleBarChart data={example.data} options={example.options} />
                  <StackBlitzLauncher example={example} chartTypes={chartTypes} />
                </p>
              ))}
						</TabPanel>

						<TabPanel>
							{examplesGrouped.map((example, index) => (
                <p key={index} className="chart">
                  <SimpleBarChart data={example.data} options={example.options} />
                  <StackBlitzLauncher example={example} chartTypes={chartTypes} />
                </p>
              ))}
						</TabPanel>

						<TabPanel>
							{examplesStacked.map((example, index) => (
                <p key={index} className="chart">
                  <SimpleBarChart data={example.data} options={example.options} />
                  <StackBlitzLauncher example={example} chartTypes={chartTypes} />
                </p>
              ))}
						</TabPanel>
					</TabPanels>
      </Tabs>
		</>
	)
}
