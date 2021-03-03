import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueRouter from "vue-router";
import PetListPage from "./pages/PetListPage";
import PetPage from "./pages/PetPage";
import HomePage from "./pages/HomePage";
import store from "./store";
import VueAxios from 'vue-axios';
import axios from "axios";
import { initAxiosInterceptors } from "./axios-interceptors";

Vue.component("font-awesome-icon", FontAwesomeIcon);
library.add(faMars, faVenus);

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/pets/:type/:page",
      component: PetListPage,
    },
    { path: '/pets/:type', redirect: '/pets/:type/1' },
    {
      path: "/pet/:id",
      component: PetPage,
    },
  ],
});

Vue.use(Vuex);

new Vue({
  router,
  store: new Vuex.Store(store),
  render: (h) => h(App),
  created() {
    initAxiosInterceptors();
  }
}).$mount("#app");


