<template>
  <div class="sidebar">
    <button class="btn" type="submit" v-on:click="clearFilters">
      Clear filters
    </button>
    <div class="sidebar-section">
      <FindAPet></FindAPet>
    </div>
    <div class="sidebar-section">
      <strong>Size:</strong>
      <ul>
        <li>
          <input
            type="checkbox"
            v-on:change="toggleFilterValue('size', 'Small')"
            v-bind:checked="isChecked('size', 'Small')"
          />
          Small
        </li>
        <li>
          <input
            type="checkbox"
            v-on:change="toggleFilterValue('size', 'Medium')"
            v-bind:checked="isChecked('size', 'Medium')"
          />
          Medium
        </li>
        <li>
          <input
            type="checkbox"
            v-on:change="toggleFilterValue('size', 'Large')"
            v-bind:checked="isChecked('size', 'Large')"
          />
          Large
        </li>
        <li>
          <input
            type="checkbox"
            v-on:change="toggleFilterValue('size', 'Extra-large')"
            v-bind:checked="isChecked('size', 'Extra-large')"
          />
          Extra-large
        </li>
      </ul>
    </div>
    <div class="sidebar-section">
      <strong>Age:</strong>
      <ul>
        <li>
          <input
            type="checkbox"
            v-on:change="toggleFilterValue('age', 'Baby')"
            v-bind:checked="isChecked('age', 'Baby')"
          />
          Baby
        </li>
        <li>
          <input
            type="checkbox"
            v-on:change="toggleFilterValue('age', 'Young')"
            v-bind:checked="isChecked('age', 'Young')"
          />
          Young
        </li>
        <li>
          <input
            type="checkbox"
            v-on:change="toggleFilterValue('age', 'Adult')"
            v-bind:checked="isChecked('age', 'Adult')"
          />
          Adult
        </li>
        <li>
          <input
            type="checkbox"
            v-on:change="toggleFilterValue('age', 'Senior')"
            v-bind:checked="isChecked('age', 'Senior')"
          />
          Senior
        </li>
      </ul>
    </div>
    <div v-if="coats && coats.length > 0" class="sidebar-section">
      <strong>Coats:</strong>
      <ul>
        <li v-bind:key="coat" v-for="coat in coats">
          <input
            type="checkbox"
            v-on:change="toggleFilterValue('coat', coat)"
            v-bind:checked="isChecked('coat', coat)"
          />
          {{ coat }}
        </li>
      </ul>
    </div>
    <div v-if="colors && colors.length > 0" class="sidebar-section">
      <strong>Colors:</strong>
      <ul>
        <li v-bind:key="color" v-for="color in colors">
          <input
            type="checkbox"
            v-on:change="toggleFilterValue('color', color)"
            v-bind:checked="isChecked('color', color)"
          />
          {{ color }}
        </li>
      </ul>
    </div>
    <div v-if="genders && genders.length > 0" class="sidebar-section">
      <strong>Genders:</strong>
      <ul>
        <li v-bind:key="gender" v-for="gender in genders">
          <input
            type="checkbox"
            v-on:change="toggleFilterValue('gender', gender)"
            v-bind:checked="isChecked('gender', gender)"
          />
          {{ gender }}
        </li>
      </ul>
    </div>
    <div class="sidebar-section">
      <strong>Attributes:</strong>
      <ul>
        <li>
          <input
            type="checkbox"
            v-on:change="toggleFilterValue('attributes', 'good_with_children')"
            v-bind:checked="isChecked('attributes', 'good_with_children')"
          />
          Good with children
        </li>
        <li>
          <input
            type="checkbox"
            v-on:change="toggleFilterValue('attributes', 'good_with_dogs')"
            v-bind:checked="isChecked('attributes', 'good_with_dogs')"
          />
          Good with dogs
        </li>
        <li>
          <input
            type="checkbox"
            v-on:change="toggleFilterValue('attributes', 'good_with_cats')"
            v-bind:checked="isChecked('attributes', 'good_with_cats')"
          />
          Good with cats
        </li>
        <li>
          <input
            type="checkbox"
            v-on:change="toggleFilterValue('attributes', 'house_trained')"
            v-bind:checked="isChecked('attributes', 'house_trained')"
          />
          House trained
        </li>
        <li>
          <input
            type="checkbox"
            v-on:change="toggleFilterValue('attributes', 'declawed')"
            v-bind:checked="isChecked('attributes', 'declawed')"
          />
          Special needs
        </li>
        <li>
          <input
            type="checkbox"
            v-on:change="toggleFilterValue('attributes', 'special_needs')"
            v-bind:checked="isChecked('attributes', 'special_needs')"
          />
          Declawed
        </li>
      </ul>
    </div>
    <div v-if="breeds && breeds.length > 0" class="sidebar-section">
      <strong>Breeds:</strong>
      <ul>
        <li v-bind:key="breed.name" v-for="breed in breeds">
          <input
            type="checkbox"
            v-on:change="toggleFilterValue('breed', breed.name)"
            v-bind:checked="isChecked('breed', breed.name)"
          />
          {{ breed.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import FindAPet from "../FindAPet";

export default {
  name: "Sidebar",
  components: {
    FindAPet,
  },
  computed: {
    filters() {
      return this.$store.state.filters;
    },
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
  methods: {
    toggleFilterValue(field, value) {
      this.$store.dispatch("toggleFilterValue", { field, value });
    },
    clearFilters() {
      this.$store.commit("clearFilters");
    },
    isChecked(field, value) {
      return this.filters[field] && this.filters[field].includes(value);
    },
  },
};
</script>

<style scoped>
.sidebar {
  flex-basis: 15%;
  flex-shrink: 0;
  padding: 25px;
  font-size: 80%;
}

ul {
  padding-left: 10px;
  list-style: none;
}

.sidebar-section {
  margin-bottom: 10px;
}

.sidebar-section strong {
  font-size: 105%;
}

.btn {
  width: 100%;
  margin-bottom: 30px;
}
</style>