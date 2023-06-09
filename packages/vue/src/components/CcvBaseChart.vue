<script lang="ts">
import { defineComponent } from 'vue'
import type { ChartTabularData } from '@carbon/charts'

export interface CoreChart<T> {
	model: {
		setData: (data: ChartTabularData) => void
		setOptions: (options: T) => void
	} | null
}

export default defineComponent({
	name: 'CcvBaseChart',
	props: {
		data: { type: Object as () => ChartTabularData, required: true },
		options: { type: Object, required: true }
	},
	data() {
		return {
			coreChart: null as CoreChart<any> | null
		}
	},
	watch: {
		data: {
			handler: function (newData: ChartTabularData) {
				this.coreChart?.model?.setData(newData)
			},
			deep: true
		},
		options: {
			handler: function (newOptions) {
				this.coreChart?.model?.setOptions(newOptions)
			},
			deep: true
		}
	}
})
</script>
