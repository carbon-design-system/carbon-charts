import { createApp, type Component } from 'vue'
import ChartsVue from './index'
import TestHarness from './components/TestHarness.vue'
const app = createApp(TestHarness as Component)
app.use(ChartsVue)
app.mount('#app')
