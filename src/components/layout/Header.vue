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
  background-color: #2a324b;
  color: white;
  display: flex;
  justify-content: space-between;
  box-shadow: 5px 0px 15px rgba(0,0,0,0.3);
}

h2:hover {
  cursor: pointer;
}
</style>