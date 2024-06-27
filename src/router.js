import { createRouter, createWebHistory } from 'vue-router';
import HomeComponent from './components/home/HomePage.vue';
import UsersComponent from './components/user/UsersComponent.vue';
import DriversPanel from './components/drivers/DriversPanel.vue';
import GeneralBilling from './components/Billing/GeneralBilling.vue';
import GeneralSettings from './components/Settings/GeneralSettings.vue';
import GeneralFleet from './components/Fleet/GeneralFleet.vue';
import ClientsPage from './components/Clients/ClientsPage.vue';
import liveMapPage from './components/live-map/liveMapPage.vue';
import ModeratorsPage from './components/Moderators/ModeratorsPage.vue';
import DriverDetails from './components/views/DriverDetails.vue';
import UserDetails from './components/views/UserDetails.vue';
import GlobalManager from './components/Manager/GlobalManager.vue';
import MainDeliver from './components/deliver/MainDeliver.vue';
import MainLogin from './components/login/MainLogin.vue';
import PageChat from './components/views/PageChat.vue'; // Импорт компонента PageChat
import store from './components/store'; // Импортируйте ваш Vuex store

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeComponent,
    meta: {
      auth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: MainLogin,
  },
  {
    path: '/user-details/:id',
    name: 'user-details',
    component: UserDetails,
    props: true,
    meta: {
      auth: true,
    },
  },
  {
    path: '/driver/:id',
    name: 'driver-details',
    component: DriverDetails,
    props: true,
    meta: {
      auth: true,
    },
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersComponent,
    meta: {
      auth: true,
    },
  },
  {
    path: '/GlobalManager',
    name: 'GlobalManager',
    component: GlobalManager,
    meta: {
      auth: true,
    },
  },
  {
    path: '/MainDeliver',
    name: 'MainDeliver',
    component: MainDeliver,
    meta: {
      auth: true,
    },
  },
  {
    path: '/ModeratorsPage',
    name: 'ModeratorsPage',
    component: ModeratorsPage,
    meta: {
      auth: true,
    },
  },
  {
    path: '/live-map',
    name: 'live-map',
    component: liveMapPage,
    meta: {
      auth: true,
    },
  },
  {
    path: '/drivers',
    name: 'Drivers',
    component: DriversPanel,
    meta: {
      auth: true,
    },
  },
  {
    path: '/clients',
    name: 'clients',
    component: ClientsPage,
    meta: {
      auth: true,
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: GeneralSettings,
    meta: {
      auth: true,
    },
  },
  {
    path: '/Payments',
    name: 'Payments',
    component: GeneralFleet,
    meta: {
      auth: true,
    },
  },
  {
    path: '/Billing',
    name: 'Billing',
    component: GeneralBilling,
    meta: {
      auth: true,
    },
  },
  {
    path: '/home',
    name: 'home',
    component: HomeComponent,
    meta: {
      auth: true,
    },
  },
  {
    path: '/app',
    name: 'app',
    component: HomeComponent,
    meta: {
      auth: true,
    },
  },
  {
    path: '/page-chat/:id/:name', // Путь для PageChat с двумя параметрами id и name
    name: 'PageChat',
    component: PageChat,
    props: true,
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    const isAuthenticated = store.getters.isAuthenticated;
    const savedToken = localStorage.getItem('__asc_accessIDToken');

    if (isAuthenticated && savedToken) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export default router;
