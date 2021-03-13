<template>
  <div>
    <div class="pet-list-page">
      <Sidebar v-bind:class="{ open: isSidebarOpen }"></Sidebar>
      <Pets></Pets>
    </div>
  </div>
</template>

<script>
import Pets from "../components/Pets";
import Sidebar from "../components/layout/Sidebar";

export default {
  name: "PetListPage",
  components: {
    Pets,
    Sidebar,
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.dispatch("getPetsPage", {
      page: to.params.page,
      type: to.params.type,
    });
    next();
  },
  computed: {
    typesAreLoaded() {
      return (
        this.$store.state.pets.types && this.$store.state.pets.types.length > 0
      );
    },
    isSidebarOpen() {
      return this.$store.state.ui.sidebarOpen;
    },
  },
  async mounted() {
    await this.$store.dispatch("initType", { type: this.$route.params.type });
    this.$store.dispatch("getPetsPage", { page: this.$route.params.page });
  },
};
</script>

<style scoped>
.pet-list-page {
  display: grid;
  grid-template-columns: 20% auto;
  grid-template-areas: "sidebar pets";
}

@media only screen and (max-width: 860px) {
  .pet-list-page {
    grid-template-columns: 1fr;
    grid-template-areas: "sidebar sidebar" "pets pets";
  }
}
</style>