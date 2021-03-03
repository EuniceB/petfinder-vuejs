<template>
  <div class="find-a-pet">
    <form v-on:submit="searchPets">
      <input
        type="text"
        v-model="name"
        name="name"
        placeholder="Search by name..."
      />
      <button class="btn" type="submit">Search</button>
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
      this.$store.dispatch("searchPets", { name: this.name });
    },
  },
};
</script>

<style scoped>
.find-a-pet {
  flex-basis: 30%;
}

.btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: #eee;
}

form {
  display: flex;
}

input {
  flex: 10;
  border: 0;
  padding: 8px;
  border: 1px solid #eee;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

button {
  flex: 2;
  border: none;
}
</style>