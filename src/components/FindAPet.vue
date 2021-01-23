<template>
  <div class="find-a-pet">
    <form v-on:submit="searchPets">
      <input type="text" v-model="name" name="name" placeholder="Search by name..." />
      <button class="btn btn-primary" type="submit">Search</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "FindAPet",
  data() {
    return {
      name: "",
    };
  },
  methods: {
      searchPets(e) {
          e.preventDefault();
          this.$store.dispatch('searchPets', {name: this.name});
          this.name = '';
      }
  }
};
</script>

<style scoped>

.find-a-pet {
    border-bottom: 1px solid #ccc;
}

form {
  display: flex;
}

input {
  flex: 10;
  border: 0;
  padding: 8px;
}

button {
  flex: 2;
  margin: 8px;
}
</style>