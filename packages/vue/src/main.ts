import { createApp } from 'vue'
import ChartsVue from './index'
import Test from './components/Test.vue'
const app = createApp(Test)
app.use(ChartsVue)
app.mount('#app')
