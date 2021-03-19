import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import router from "./router";
import VueAxios from 'vue-axios';
import axios from "axios";
import { initAxiosInterceptors } from "./axios-interceptors";
import uiStore from "./ui-store";
import petStore from "./pet-store";
import VueRouter from "vue-router";

Vue.component("font-awesome-icon", FontAwesomeIcon);
library.add(faMars, faVenus);

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(Vuex);

new Vue({
  router,
  store: new Vuex.Store({ modules: { ui: uiStore, pets: petStore } }),
  render: (h) => h(App),
  created() {
    initAxiosInterceptors();
  }
}).$mount("#app");


