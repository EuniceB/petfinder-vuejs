<template>
  <div class="sidebar">
    <div v-if="breeds && breeds.length > 0" class="filter-section">
      <strong>Breeds:</strong>
      <ul>
        <li v-bind:key="breed.name" v-for="breed in breeds">
          <input type="checkbox" /> {{ breed.name }}
        </li>
      </ul>
    </div>
    <div class="filter-section">
      <strong>Size:</strong>
      <ul>
        <li><input type="checkbox" /> Small</li>
        <li><input type="checkbox" /> Medium</li>
        <li><input type="checkbox" /> Large</li>
        <li><input type="checkbox" /> Extra-large</li>
      </ul>
    </div>
    <div class="filter-section">
      <strong>Age:</strong>
      <ul>
        <li><input type="checkbox" /> Baby</li>
        <li><input type="checkbox" /> Young</li>
        <li><input type="checkbox" /> Adult</li>
        <li><input type="checkbox" /> Senior</li>
      </ul>
    </div>
    <div v-if="coats && coats.length > 0" class="filter-section">
      <strong>Coats:</strong>
      <ul>
        <li v-bind:key="coat" v-for="coat in coats">
          <input type="checkbox" /> {{ coat }}
        </li>
      </ul>
    </div>
    <div v-if="colors && colors.length > 0" class="filter-section">
      <strong>Colors:</strong>
      <ul>
        <li v-bind:key="color" v-for="color in colors">
          <input type="checkbox" /> {{ color }}
        </li>
      </ul>
    </div>
    <div v-if="genders && genders.length > 0" class="filter-section">
      <strong>Genders:</strong>
      <ul>
        <li v-bind:key="gender" v-for="gender in genders">
          <input type="checkbox" /> {{ gender }}
        </li>
      </ul>
    </div>
    <div class="filter-section">
      <strong>Attributes:</strong>
      <ul>
        <li><input type="checkbox" /> Good with children</li>
        <li><input type="checkbox" /> Good with dogs</li>
        <li><input type="checkbox" /> Good with cats</li>
        <li><input type="checkbox" /> House trained</li>
        <li><input type="checkbox" /> Special needs</li>
        <li><input type="checkbox" /> Declawed</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  computed: {
    breeds() {
      return this.$store.state.breeds;
    },
    coats() {
      return this.$store.state.coats;
    },
    genders() {
      return this.$store.state.genders;
    },
    colors() {
      return this.$store.state.colors;
    },
  },
};
</script>

<style scoped>
.sidebar {
  flex-basis: 15%;
  flex-shrink: 0;
  padding: 10px;
  font-size: 80%;
}

ul {
  padding-left: 10px;
  list-style: none;
}

.filter-section {
  margin-bottom: 10px;
}

.filter-section strong {
  font-size: 105%;
}
</style>