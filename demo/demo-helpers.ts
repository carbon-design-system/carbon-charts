export const setDemoActionsEventListener = (chartType: any, oldData: any) => {
	const changeDataButton = document.getElementById(`change-data-${chartType}`);
	changeDataButton.onclick = e => {
		e.preventDefault();

		changeDemoData(chartType, oldData);
	};

	switch (chartType) {
		case "donut":
			window.onkeydown = (e) => {
				if (e.keyCode === 13) {
					changeDemoData(chartType, oldData);
				}
			};

			break;
	}
};

export const changeDemoData = (chartType: any, oldData: any) => {
	switch (chartType) {
		case "donut":
			// Randomize old data values
			const newData = oldData.map(dataPoint => {
				const newValue = Math.max(0.2 * dataPoint.value, Math.floor(dataPoint.value * Math.random() * (Math.random() * 5)));
				return Object.assign({}, dataPoint, {value: newValue});
			});
			classyDonutChart.setData(newData);

			// Update DonutCenter values
			const { number: centerNumber } = classyDonutChart.center.configs;
			let newCenterNumber = Math.floor(Math.max(0.2 * centerNumber, centerNumber * Math.random() * (Math.random() * 5)));
			if (newCenterNumber <= 10) {
				newCenterNumber = 10000;
			}

			classyDonutChart.center.configs.number = newCenterNumber;
			classyDonutChart.center.update();

			break;
	}
};
