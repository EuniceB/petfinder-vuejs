
<template>
  <ul>
    <router-link
      :to="'/pets/' + type.name"
      tag="li"
      v-for="type in types"
      v-bind:key="type.name"
    >
      <img v-bind:src="require('@/assets/' + photos[type.name])" />
      {{ type.name }}
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
    setTimeout(() => {
    }, 10000);
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

ul li {
  margin: 8px;
  display: flex;
  flex-direction: column;
  flex: 0 0 100%;
  padding: 16px;
  align-items: center;
  justify-content: center;
  background: #eaeaea;
}

@media screen and (min-width: 800px) {
  ul li {
    flex: 0 0 25%;
  }
}

ul li:hover {
  cursor: pointer;
}

img {
  display: block;
  height: 150px;
  margin-bottom: 16px
}
</style>