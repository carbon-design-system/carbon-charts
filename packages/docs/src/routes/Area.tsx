import { useState, useEffect } from 'react'
import { AreaChart, StackedAreaChart } from '@carbon/charts-react'
import {
  Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs } from '@carbon/react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/area/examples'
import { chartTypesStacked, examplesStacked } from '../lib/area/examplesStacked'
import '@carbon/charts-react/styles.css'
import './Area.scss'

export default function Area() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleTabChange = (evt: { selectedIndex: number }) => {
		setSelectedIndex(evt.selectedIndex)
	}

  useEffect(() => {
	}, [selectedIndex])
  
  return (
    <>
      <PageHeader title="Area Charts" />

      <p>
        Area charts are similar to line charts but with areas below the lines filled with colors or
        patterns.
      </p>

      <StackBlitzLauncherExplanation/>

      <Tabs selectedIndex={selectedIndex} onChange={handleTabChange}>
        <TabList aria-label="List of area chart types">
          <Tab>Basic</Tab>
          <Tab>Stacked</Tab>
        </TabList>

        <TabPanels>
						<TabPanel>
              {examples.map((example, index) => (
                <p key={index} className="chart">
                  <AreaChart data={example.data} options={example.options} />
                  <StackBlitzLauncher example={example} chartTypes={chartTypes} />
                </p>
              ))}
						</TabPanel>
						<TabPanel>
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
						</TabPanel>
					</TabPanels>
      </Tabs>
    </>
  )
}