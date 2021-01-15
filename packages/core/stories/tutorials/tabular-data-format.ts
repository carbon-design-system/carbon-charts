import marked from 'marked';

export const tabularTutorial = {
	name: 'Tabular data format',
	content: marked(`
# Tabular data format

In **v0.30.8** we updated updated the default data format to be of a tabular nature.

This means more flexibility for our users in terms of the shape
of the data they can provide to the library.

**If you're looking to use @carbon/charts@0.30.8 and above,
we recommend updating your data type as it should be a quick
and easy switch.**

\`\`\`js
// Before
const simpleBarData = {
    labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
    datasets: [
        {
            data: [
                65000,
                29123,
                35213,
                51213,
                16932
            ]
        }
    ]
};

// After
const simpleBarData = [
    { group: "Qty", value: 65000 },
    { group: "More", value: 29123 },
    { group: "Sold", value: 35213 },
    { group: "Restocking", value: 51213 },
    { group: "Misc", value: 16932 }
];
\`\`\`

As you might have noticed in the examples above,
the charting data provided in the existing format
was an \`object\` that described labels, datasets and datapoints.

Now in the new format you would provide
an **array where each element is a datapoint.**

Now we need to introduce some new fields into our \`axes\`
options in order to map keys within our datapoints to axis values.

##### Additions to charting options:
*Note:* **This section does not apply to any
non-axis charting components (e.g. pie & donut)**

We'd still need a way to know which keys map to
your values (\`rangeIdentifier\`) and which map to
the labels you'd be showing on an axis (\`domainIdentifier\`).

These identifiers can be set through the \`mapsTo\`
option within each axis, and are defeaulted to \`value\`
& (\`key\` or \`date\` - depending on whether your datapoints
include dates).

**Although the library will set fallback
\`mapsTo\` defaults, you should always set your own.**

\`\`\`js
const simpleBarOptions = {
    title: "Simple bar (discrete)",
    axes: {
        left: {
            mapsTo: "value"
        },
        bottom: {
            mapsTo: "group",
            scaleType: "labels"
        }
    }
};
\`\`\`

##### Non-axis chart types:

In the case of pie & donut the library will
always look for the \`value\` key within your datapoints:

\`\`\`js
export const pieData = [
	{ group: "2V2N 9KYPM version 1", value: 20000 },
	{ group: "L22I P66EP L22I P66EP L22I P66EP", value: 65000 },
	{ group: "JQAI 2M4L1", value: 75000 },
	{ group: "J9DZ F37AP", value: 1200 },
	{ group: "YEL48 Q6XK YEL48", value: 10000 },
	{ group: "Misc", value: 25000 }
];
\`\`\`

##### Customizable options:

You're able to customize the \`groupMapsTo\`
which is used to determine the key within your data that
identifies the grouping of the datapoints.

\`\`\`js
const simpleBarOptions = {
    data: {
		groupMapsTo: "category"
	}
};

const simpleBarData = [
    { category: "Qty", value: 65000 },
    { category: "More", value: 29123 },
    { category: "Sold", value: 35213 },
    { category: "Restocking", value: 51213 },
    { category: "Misc", value: 16932 }
];
\`\`\`

For bubble charts you're able to customize the "radius" identifier:
\`\`\`js
export const bubbleDoubleLinearOptions = {
	title: "Bubble (linear)",
	axes: {
		bottom: {
			title: "No. of employees",
			mapsTo: "sales",
			includeZero: false
		},
		left: {
			title: "Annual sales",
			mapsTo: "profit",
			includeZero: false
		}
	},
	bubble: {
		radiusMapsTo: "surplus"
	}
};

const bubbleDoubleLinearData = [
	{ group: "Dataset 1", sales: 10000, profit: 32100, surplus: 50000 },
	{ group: "Dataset 1", sales: 12000, profit: 23500, surplus: 34000 },
	{ group: "Dataset 1", sales: 14000, profit: 53100, surplus: 63000 },
	{ group: "Dataset 1", sales: 15000, profit: 42300, surplus: 43000 },
	{ group: "Dataset 1", sales: 16000, profit: 12300, surplus: 55000 },
	{ group: "Dataset 2", sales: 11000, profit: 12400, surplus: 25000 },
	{ group: "Dataset 2", sales: 13000, profit: 34500, surplus: 35000 },
	{ group: "Dataset 2", sales: 13500, profit: 23100, surplus: 55000 },
	{ group: "Dataset 2", sales: 15500, profit: 63200, surplus: 35000 },
	{ group: "Dataset 2", sales: 15750, profit: 24300, surplus: 64000 }
];
\`\`\`

**Default value for \`radiusMapsTo\` is \`radius\`**
`),
};
