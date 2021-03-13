<template>
  <header>
    <router-link tag="h2" :to="'/'">Online shelter</router-link>
    <img
      class="filter-button"
      src="@/assets/filter.svg"
      v-on:click="toggleSidebar()"
    />
  </header>
</template>

<script>
export default {
  name: "Header",
  computed: {
    isSidebarOpen() {
      return this.$store.state.ui.sidebarOpen;
    },
  },
  methods: {
    toggleSidebar() {
      this.$store.commit("setSidebarOpen", !this.isSidebarOpen);
    },
  },
};
</script>

<style scoped>
header {
  padding: 20px;
  background-color: #2a324b;
  color: white;
  display: flex;
  justify-content: space-between;
  box-shadow: 5px 0px 15px rgba(0, 0, 0, 0.3);
}

.filter-button {
  display: none;
  height: 2em;
  color: white;
  cursor: pointer;
}

@media only screen and (max-width: 860px) {
  .filter-button {
    display: inline-block;
  }
}

h2:hover {
  cursor: pointer;
}
</style>