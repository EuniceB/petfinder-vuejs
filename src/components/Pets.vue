<template>
  <div class="pet-list">
    <div v-if="loading" class="loader">
      <img src="@/assets/loading.gif" />
    </div>

    <div v-if="!loading">
      <Pagination v-if="pagination && pets && pets.length > 0"></Pagination>
      <div class="pets" v-if="pets && pets.length > 0">
        <router-link
          tag="div"
          :to="'/pet/' + pet.id"
          class="pet"
          v-bind:key="pet.id"
          v-for="pet in pets"
          ><PetItem v-bind:pet="pet"></PetItem
        ></router-link>
      </div>
      <Pagination v-if="pagination && pets && pets.length > 0"></Pagination>
      <p v-if="!pets || pets.length === 0">No pets found</p>
    </div>
  </div>
</template>

<script>
import Pagination from "./Pagination";
import PetItem from "./PetItem";
export default {
  name: "Pets",
  components: {
    Pagination,
    PetItem,
  },
  computed: {
    loading() {
      return this.$store.state.pets.loading;
    },
    pets() {
      return this.$store.state.pets.pets;
    },
    pagination() {
      return this.$store.state.pets.pagination;
    },
  },
};
</script>

<style scoped>
.pet-list {
  min-height: inherit;
  display: flex;
  grid-area: pets;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 25px;
}

.pets {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
}

.pets > * {
  flex: 0 0 25em;
  margin: 2em;
}
</style>