const initialState = {
    sidebarOpen: false
};

export default {
    state: initialState,
    mutations: {
        setSidebarOpen(state, payload) {
            state.sidebarOpen = payload;
        }
    }
}