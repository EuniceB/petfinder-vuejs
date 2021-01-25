<template>
  <div>
    <FindAPet></FindAPet>
    <Pets></Pets>
  </div>
</template>

<script>
import FindAPet from "../components/FindAPet";
import Pets from "../components/Pets";

export default {
  name: "PetListPage",
  components: {
    FindAPet,
    Pets,
  },
  computed: {
    typesAreLoaded() {
      return this.$store.state.types && this.$store.state.types.length > 0;
    },
  },
  async mounted() {
    this.$store.dispatch("getPetsPage", { type: this.$route.params.type });
  },
};
</script>

<style scoped>
</style>