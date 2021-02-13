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

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response != 401) {
      return Promise.reject(error);
    }
    const accessToken = await getNewAccessToken();
    localStorage.setItem("accessToken", accessToken);
    error.config.headers.Authorization = `Bearer ${accessToken}`;
    return axios.request(error.config);
  }
);

axios.interceptors.request.use(
  async (request) => {
    if (request.url.endsWith("/oauth2/token")) return request;

    if (
      !request.headers.Authorization ||
      request.headers.Authorization.length === 0 ||
      request.headers.Authorization === "Bearer undefined"
    ) {
      let accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        accessToken = await getNewAccessToken();
        localStorage.setItem("accessToken", accessToken);
      }
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    console.log("Request error:", error.response);
    return Promise.reject(error);
  }
);

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
const store = new Vuex.Store({
  // TODO: Put all of this in a separate file
  state: {
    pet: null,
    loading: false,
    pagination: null,
    pets: [],
    types: [],
    type: null,
  },
  mutations: {
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
      state.type = payload.type;
    },
  },
  actions: {
    async getPetInformation({ state, commit }, payload) {
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
        console.log("Error", err.message);
      }
    },
    async getTypes({ state, commit }) {
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
        console.log("Error", err.message);
      }
    },
    async getPetsPage({ state, commit, dispatch }, payload) {
      if (!payload.page) {
        payload.page = 1;
      }
      try {
        commit("setLoading", { loading: true });
        if (state.types.length === 0) {
          await dispatch("getTypes");
        }
        let typeLink;
        if (payload.type != null) {
          const type = state.types.find((type) => type.name === payload.type);
          const newLink = type._links.self.href;
          typeLink = newLink.substring(newLink.lastIndexOf("/") + 1);
          commit("setType", { type: typeLink });
        } else {
          typeLink = state.type;
        }

        const {
          data: { animals, pagination },
        } = await axios.get(`/animals?type=${typeLink}&page=${payload.page}`);
        commit("setPets", { pets: animals });
        commit("setPagination", { pagination });
        commit("setLoading", { loading: false });
      } catch (err) {
        console.log("Error", err.message);
      }
    },
    async searchPets({ state, commit }, payload) {
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
        console.log("Error", err.message);
      }
    },
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

async function getNewAccessToken() {
  const {
    data: { access_token },
  } = await axios.post("/oauth2/token", {
    grant_type: "client_credentials",
    client_id: process.env.VUE_APP_CLIENT_ID,
    client_secret: process.env.VUE_APP_CLIENT_SECRET,
  });
  return access_token;
}
