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
  created() {
    console.log(this.$route.params.type)
    this.$store.commit("setType", {type: this.$route.params.type});
    this.$store.dispatch("getPetsPage");
  }
};
</script>

<style scoped>
</style>