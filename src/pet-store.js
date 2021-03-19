import client from "./axios";

const initialState = {
    pet: null,
    loading: false,
    pagination: null,
    pets: [],
    types: [],
    breeds: [],
    coats: [],
    colors: [],
    genders: [],
    filters: {},
    type: null,
    query: null
};

export default {
    state: initialState,
    mutations: {
        setLoading(state, payload) {
            state.loading = payload.loading;
        },
        setQuery(state, payload) {
            state.query = payload.query;
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
        setBreeds(state, payload) {
            state.breeds = payload.breeds;
        },
        setColors(state, payload) {
            state.colors = payload.colors;
        },
        setCoats(state, payload) {
            state.coats = payload.coats;
        },
        setGenders(state, payload) {
            state.genders = payload.genders;
        },
        clearFilters(state) {
            state.filters = {};
        },
        toggleFilterValue(state, payload) {
            const value = encodeURI(payload.value);
            const fieldFilter = state.filters[payload.field];
            if (fieldFilter != null) {
                if (fieldFilter.includes(value)) {
                    if (fieldFilter.length === 1) {
                        const cp = { ...state.filters };
                        delete cp[payload.field];
                        state.filters = cp;
                    } else {
                        state.filters[payload.field] = fieldFilter.filter(filter => filter != value);
                    }
                } else {
                    fieldFilter.push(value);
                }
            } else {
                state.filters = { ...state.filters, [payload.field]: [value] };
            }
        }
    },
    actions: {
        async toggleFilterValue({ commit, dispatch }, payload) {
            const { field, value } = payload;
            commit("toggleFilterValue", { field, value });
            dispatch("getPetsPage", {})
        },
        async getPetInformation({ state, commit }, payload) {
            try {
                commit("setLoading", { loading: true });
                const {
                    data: { animal },
                } = await client.get(`/animals/${payload.id}`, {
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
                } = await client.get(`/types`, {
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
        async getBreeds({ state, commit }) {
            try {
                commit("setLoading", { loading: true });
                if (!state.type) {
                    throw Error("No type loaded!");
                }
                const {
                    data: { breeds },
                } = await client.get(`/types/${state.type.link}/breeds`);
                commit("setBreeds", { breeds });
                commit("setLoading", { loading: false });
            } catch (err) {
                console.log("Error", err.message);
            }
        },
        async initType({ state, commit, dispatch }, payload) {
            if (state.type?.name === payload.type) return;
            try {
                commit("setLoading", { loading: true });
                if (state.types.length === 0) {
                    await dispatch("getTypes");
                }
                if (!payload.type) throw Error("Type not specified");
                if (payload.type != null) {
                    const type = state.types.find((type) => type.name === payload.type);
                    const newLink = type._links.self.href;
                    let typeLink = newLink.substring(newLink.lastIndexOf("/") + 1);
                    commit("setType", { type: { name: payload.type, link: typeLink } });
                    commit("setCoats", { coats: type.coats });
                    commit("setGenders", { genders: type.genders });
                    commit("setColors", { colors: type.colors });
                    commit("setPets", { pets: [] });
                    commit("setPet", { pet: null });
                    commit("clearFilters");
                    dispatch("getBreeds");
                }
            } catch (err) {
                console.log("Error", err.message);
            }
        },
        async getPetsPage({ state, commit, dispatch }, payload = {}) {
            try {
                const page = payload.page || (state.pagination ? state.pagination.current_page : 1);
                const query = state.query ? `&name=${state.query}` : '';
                let filtersAsString = Object.entries(state.filters).map(elem => {
                    if (elem[0] === "attributes") {
                        return elem[1].map(attr => `${attr}=true`).join("&");
                    }
                    return `${elem[0]}=${elem[1]}`
                }
                ).join("&");
                commit("setLoading", { loading: true });
                if (state.types.length === 0) {
                    await dispatch("getTypes");
                }
                let typeLink;
                if (payload.type != null) {
                    const type = state.types.find((type) => type.name === payload.type);
                    const newLink = type._links.self.href;
                    typeLink = newLink.substring(newLink.lastIndexOf("/") + 1);
                } else {
                    typeLink = state.type.link;
                }
                const {
                    data: { animals, pagination },
                } = await client.get(`/animals?type=${typeLink}${query}&page=${page}${filtersAsString.length > 0 ? '&' + filtersAsString : ''}`);
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
                    data: { animals, pagination },
                } = await client.get(`/animals?type=${state.type.link}&name=${payload.name}`,
                    {
                        headers: {
                            Authorization: `Bearer ${state.accessToken}`,
                        },
                    }
                );
                commit("setPets", { pets: animals });
                commit("setPagination", { pagination });
                commit("setLoading", { loading: false });
                commit("setQuery", { query: payload.name })
            } catch (err) {
                console.log("Error", err.message);
            }
        },
    }
}