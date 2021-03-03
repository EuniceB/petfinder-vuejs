
<template>
  <ul>
    <router-link
      :to="'/pets/' + type.name + '/1'"
      tag="li"
      class="card"
      v-for="type in types"
      v-bind:key="type.name"
    >
      <img v-bind:src="require('@/assets/' + photos[type.name])" />
      <p>{{ type.name }}</p>
    </router-link>
  </ul>
</template>


<script lang="ts">
export default {
  name: "HomePage",
  data() {
    return {
      photos: {
        Dog: "dog.jpeg",
        Cat: "cat.jpeg",
        Rabbit: "rabbit.jpeg",
        "Small & Furry": "furry.jpeg",
        Horse: "horse.jpeg",
        Bird: "bird.jpeg",
        "Scales, Fins & Other": "scales.jpeg",
        Barnyard: "barnyard.jpeg",
      },
    };
  },
  computed: {
    types() {
      return this.$store.state.types;
    },
  },
  mounted() {
    this.$store.dispatch("getTypes");
    setTimeout(() => {}, 10000);
  },
};
</script>

<style scoped>
ul {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 80%;
  margin: 32px auto 0 auto;
  list-style: none;
  flex-wrap: wrap;
}

.card {
  flex: 0 1 19em;
  margin: 2em;
}

.card p {
  text-align: center;
}

ul li:hover {
  cursor: pointer;
}

img {
  display: block;
  height: 150px;
  margin: 0 auto;
  margin-bottom: 16px;
  max-width: 100%;
}
</style>