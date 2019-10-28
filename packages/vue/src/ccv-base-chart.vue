<script>
export default {
	name: 'CcvBaseChart',
	data() {
		return {
			coreChart: null,
		};
	},
	props: {
		data: { type: Object, required: true },
		options: { type: Object, required: true },
	},
	watch: {
		data: {
			handler: function(newData) {
				this.coreChart.model.setData(newData);
			},
			deep: true,
		},
		options: {
			handler: function(newOptions) {
				this.coreChart.model.setOptions(newOptions);
			},
			deep: true,
		}
	},
};
</script>
