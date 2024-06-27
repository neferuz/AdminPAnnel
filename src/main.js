import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Импортируйте ваш файл router.js
import store from './components/store'; // Импортируйте ваш Vuex store
import './assets/global.css';
import Highcharts from 'highcharts';
import drilldown from 'highcharts/modules/drilldown';
import exporting from 'highcharts/modules/exporting';
import accessibility from 'highcharts/modules/accessibility';


drilldown(Highcharts);
exporting(Highcharts);
accessibility(Highcharts);

const app = createApp(App);

app.use(router);
app.use(store);
store.dispatch('initializeUser');
app.mount('#app');