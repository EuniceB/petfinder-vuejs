<template>
  <div>
    <div class="flex">
      <Sidebar></Sidebar>
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
  computed: {
    typesAreLoaded() {
      return this.$store.state.types && this.$store.state.types.length > 0;
    },
  },
  async mounted() {
    await this.$store.dispatch("initType", { type: this.$route.params.type });
    this.$store.dispatch("getPetsPage");
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}
</style>