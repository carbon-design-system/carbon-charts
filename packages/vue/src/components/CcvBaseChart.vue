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
	data() {
		return {
			coreChart: null as CoreChart<any> | null
		}
	},
	props: {
		data: { type: Object as () => ChartTabularData, required: true },
		options: { type: Object, required: true }
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
