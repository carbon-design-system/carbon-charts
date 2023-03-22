<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'CcvBaseChart',
	data() {
		return {
			coreChart: null as any | null // would be improved with a base type
		}
	},
	props: {
		data: { type: [Object, Array], required: true },
		options: { type: Object, required: true }
	},
	watch: {
		data: {
			handler: function (newData) {
				this.coreChart?.model.setData(newData)
			},
			deep: true
		},
		options: {
			handler: function (newOptions) {
				this.coreChart?.model.setOptions(newOptions)
			},
			deep: true
		}
	}
})
</script>
