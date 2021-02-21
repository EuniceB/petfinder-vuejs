<template>
  <div class="pet-list">
    <div v-if="loading" class="loader">
      <img src="@/assets/loading.gif" />
    </div>

    <div v-if="!loading">
      <Pagination v-if="pagination"></Pagination>
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
      return this.$store.state.loading;
    },
    pets() {
      return this.$store.state.pets;
    },
    pagination() {
      return this.$store.state.pagination;
    },
  }
};
</script>

<style scoped>
.pet-list {
  min-height: inherit;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.pets {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.pet {
  width: 22%;
  margin: 10px;
}

@media screen and (max-width: 1500px) {
  .pet {
    width: 30%;
  }
}

@media screen and (max-width: 900px) {
  .pet {
    width: 47%;
  }
}

@media screen and (max-width: 670px) {
  .pet {
    width: 100%;
  }
}
</style>