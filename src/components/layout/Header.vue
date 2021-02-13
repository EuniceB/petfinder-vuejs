<template>
  <header>
    <router-link tag="h2" :to="'/'">Online shelter</router-link>
    <FindAPet></FindAPet>
  </header>
</template>

<script>
import FindAPet from "../FindAPet";
export default {
  name: "Header",
  components: {
    FindAPet
  }
};
</script>

<style scoped>
header {
  padding: 20px;
  background-color: #f15025;
  color: white;
  display: flex;
  justify-content: space-between;
}

h2:hover {
  cursor: pointer;
}
</style>