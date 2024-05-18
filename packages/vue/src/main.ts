import { createApp } from 'vue'
import ChartsVue from './index'
import TestHarness from './components/TestHarness.vue'
const app = createApp(TestHarness)
app.use(ChartsVue)
app.mount('#app')
