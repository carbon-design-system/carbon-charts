import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

export default function Dashboards() {
	return (
		<>
			<PageHeader title="Dashboards" />
			Please see the{' '}
			<Link to="https://carbondesignsystem.com/data-visualization/dashboards/" target="_blank">
				Dashboards
			</Link>{' '}
			page on the <Link to="https://carbondesignsystem.com">Carbon Design System</Link> site for
			more details.
			{/* <p>
        <img src="/images/dashboard.png" alt="Dashboard" className="dashboard" />
      </p>

      <p>
        Context is everything. Dashboards will vary widely depending on the context they are designed for
        and must be carefully considered.
      </p>

      <h2>Presentation dashboard</h2>

      <p>
        Presentation dashboards show viewers the current status of key performance indicators (KPIs)
        relevant to the business problem. A good presentation dashboard provides a big-picture view of the
        data while serving as a guide for the audience to decide what areas they would like to focus on
        and explore.
      </p>
      <p>
        Examples include a car dashboard, a stock market ticker board, or a route map with the locations
        of nearby gas stations layered on top.
      </p>

      <h3>Best practices</h3>

      <h4>Establish a strong hierarchy</h4>

      <p>
        Prioritize data by importance, then create a clear visual hierarchy. The most important data
        should have the highest contrast and occupy the largest area.
      </p>

      <p>
        Most people in the west read left to right, then top to bottom. This is known as the <a
          href="https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/"
          target="_blank">F-shaped pattern</a>. Place the most important at the top of the page and follow the F-pattern for the remaining
        elements, finishing with the least important information.
      </p>

      <h4>Limit the number of metrics</h4>

      <p>
        Non-essential information should be provided as needed. Design a dashboard to reduce a page&apos;s
        complexity by stripping away anything that could distract a user from interpreting the
        information.
      </p>

      <h4>Use consistent color assignments</h4>

      <p>Always use consistent colors for each data set within a dashboard.</p>

      <h4>Use white space to enhance clarity</h4>

      <p>
        White space either sets elements apart or brings them together to distinguish a point&apos;s priority.
        Space acts as a visual separator and guides a user&apos;s eye through a page. It provides relief and
        breathing room. According to <a href="http://www.humanfactors.com/newsletters/yeah_but_can_you_give_me_a_reference.asp"
          target="_blank">research</a> conducted by Human Factors International, white space increases comprehension
        by almost 20 percent.
      </p>

      <h2>Exploration dashboard</h2>

      <p>
        Exploration dashboards allow users to interact with the data to discover insights and identify
        patterns. Examples of actions a user may perform on data include search, sort and filter data,
        roll up, and drill down. Exploration dashboards are intended for people who seek to look beyond a
        primary view and have to be very interactive.
      </p>

      <p>
        Examples include financial reports with roll up and drill down capabilities or interactive maps
        that include zooming in and out. Others include business previews with a search bar and additional
        data available on demand like opening hours and reviews.
      </p>

      <h3>Best practices</h3>

      <h4>Consistency is key</h4>

      <p>
        All charts should use the same layout and spacing, and have legends in the same position relative
        to the charting area. Do not switch measurement systems, like imperial to metric.
      </p>

      <h4>Linked charts</h4>

      <p>
        Mirror chart modifications like filter and zoom. When a user manipulates one chart, other charts
        showing related data sets should automatically update to provide multi-dimensional views of the
        user&apos;s action.
      </p>

      <h4>Annotation</h4>

      <p>
        Use annotations to highlight trends, averages, peaks, and valleys to provide additional
        information. Annotations should help users interpret fluctuations in the data. Avoid annotations
        that obstruct the view of data.
      </p> */}
		</>
	)
}
