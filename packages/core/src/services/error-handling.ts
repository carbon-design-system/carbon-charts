export default {
	INTERNAL: {
		CHART: {
			MISSING_METHOD: methodName => {
				console.error(`Chart missing its ${methodName}() method`);
			}
		},
		COMPONENT: {
			MISSING_METHOD: methodName => {
				console.error(`Component missing its ${methodName}() method`);
			}
		}
	}
};
