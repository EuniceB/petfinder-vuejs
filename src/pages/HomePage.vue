
<template>
  <ul>
    <router-link
      :to="'/pets/' + type.name"
      tag="li"
      v-for="type in types"
      v-bind:key="type.id"
    >
      <a>{{ type.name }}</a>
    </router-link>
  </ul>
</template>


<script lang="ts">
export default {
  name: "HomePage",
  computed: {
    types() {
      return this.$store.state.types;
    },
  },
  mounted() {
    this.$store.dispatch("getTypes");
  },
};
</script>

<style scoped>
</style>