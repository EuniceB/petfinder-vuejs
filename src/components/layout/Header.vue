<template>
  <header>
    <router-link tag="h1" :to="'/'">Online shelter</router-link>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
header {
  padding: 20px;
  background-color: #f15025;
  color: white;
  text-align: center;
}

h1:hover {
  cursor: pointer;
}
</style>