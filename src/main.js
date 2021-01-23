import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueRouter from "vue-router";
import PetListPage from "./pages/PetListPage";
import PetPage from "./pages/PetPage";
import HomePage from "./pages/HomePage";

Vue.component("font-awesome-icon", FontAwesomeIcon);
library.add(faMars, faVenus);

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: HomePage,
    },
    {
      path: "/pets/:type",
      component: PetListPage,
    },
    {
      path: "/pet/:id",
      component: PetPage,
    },
  ],
});

Vue.use(Vuex);
const store = new Vuex.Store({ // TODO: Put all of this in a separate file
  state: {
    accessToken: null,
    pet: null,
    loading: false,
    pagination: null,
    pets: [],
    types: [],
    type: null,
  },
  mutations: {
    setAccessToken(state, payload) {
      state.accessToken = payload.accessToken;
    },
    setLoading(state, payload) {
      state.loading = payload.loading;
    },
    setPet(state, payload) {
      state.pet = payload.pet;
    },
    setTypes(state, payload) {
      state.types = payload.types;
    },
    setPagination(state, payload) {
      state.pagination = payload.pagination;
    },
    setPets(state, payload) {
      state.pets = payload.pets;
    },
    setType(state, payload) {
      let newType = state.types.find((type) => type.name === payload.type);
      const newLink = newType._links.self.href;
      state.type = newLink.substring(newType._links.self.href.lastIndexOf("/")+1);
    },
  },
  actions: {
    async getNewAccessToken({ commit }) {
      try {
        console.log("Getting a new access token...");
        console.log(process.env.VUE_APP_CLIENT_ID, process.env.VUE_APP_CLIENT_SECRET)
        const { data } = await axios.post("/oauth2/token", {
          grant_type: "client_credentials",
          client_id: process.env.VUE_APP_CLIENT_ID,
          client_secret: process.env.VUE_APP_CLIENT_SECRET,
        });
        commit("setAccessToken", { accessToken: data.access_token });
        console.log(`New access token = ${data.access_token}`);
      } catch (err) {
        if (err.response) {
          console.log(err.response);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error", err.message);
        }
      }
    },
    async getPetInformation({ state, commit, dispatch }, payload) {
      try {
        commit("setLoading", { loading: true });
        const {
          data: { animal },
        } = await axios.get(`/animals/${payload.id}`, {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        });
        commit("setPet", { pet: animal });
        commit("setLoading", { loading: false });
      } catch (err) {
        if (err.response) {
          console.log(err.response);
          if (err.response.status === 401) {
            await dispatch("getNewAccessToken");
            dispatch("getPetInformation", { id: payload.id });
          }
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error", err.message);
        }
      }
    },
    async getTypes({ state, commit, dispatch }) {
      try {
        commit("setLoading", { loading: true });
        const {
          data: { types },
        } = await axios.get(`/types`, {
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
        });
        commit("setTypes", { types });
        commit("setLoading", { loading: false });
      } catch (err) {
        if (err.response) {
          console.log(err.response);
          if (err.response.status === 401) {
            await dispatch("getNewAccessToken");
            dispatch("getTypes");
          }
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error", err.message);
        }
      }
    },
    async getPetsPage({ state, commit, dispatch }, payload = { page: 1 }) {
      try {
        commit("setLoading", { loading: true });
        const {
          data: { animals, pagination },
        } = await axios.get(
          `/animals?type=${state.type}&page=${payload.page}`,
          {
            headers: {
              Authorization: `Bearer ${state.accessToken}`,
            },
          }
        );
        commit("setPets", { pets: animals });
        commit("setPagination", { pagination });
        commit("setLoading", { loading: false });
      } catch (err) {
        if (err.response) {
          console.log(err.response);
          if (err.response.status === 401) {
            await dispatch("getNewAccessToken");
            dispatch("getPetsPage");
          }
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log("Error", err.message);
        }
      }
    },
    async searchPets({ state, commit, dispatch }, payload) {
      try {
        commit("setLoading", { loading: true });
        const {
          data: { pets, pagination },
        } = await axios.get(
          `/animals?type=${state.type}&name=${payload.name}`,
          {
            headers: {
              Authorization: `Bearer ${state.accessToken}`,
            },
          }
        );
        commit("setPets", { pets });
        commit("setPagination", { pagination });
        commit("setLoading", { loading: false });
      } catch (err) {
        console.log(err);
        console.log(
          `Error while searching for pets: ${err}. Will try to get a new access token.`
        );
        await dispatch("getNewAccessToken");
        dispatch("searchPets");
      }
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
