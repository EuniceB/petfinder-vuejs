<template>
  <div class="sidebar">
    <button class="btn" type="submit" v-on:click="clearFilters">
      Clear filters
    </button>
    <div class="sidebar-section">
      <FindAPet></FindAPet>
    </div>
    <div class="filters">
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
              v-on:change="
                toggleFilterValue('attributes', 'good_with_children')
              "
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
      <div v-if="colors && colors.length > 0" class="sidebar-section colors">
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
      <div v-if="breeds && breeds.length > 0" class="sidebar-section breeds">
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
      return this.$store.state.pets.filters;
    },
    breeds() {
      return this.$store.state.pets.breeds;
    },
    coats() {
      return this.$store.state.pets.coats;
    },
    genders() {
      return this.$store.state.pets.genders;
    },
    colors() {
      return this.$store.state.pets.colors;
    },
  },
  methods: {
    toggleFilterValue(field, value) {
      this.$store.dispatch("toggleFilterValue", { field, value });
    },
    clearFilters() {
      this.$store.commit("clearFilters");
      this.$store.dispatch("getPetsPage", { page: 1 });
    },
    isChecked(field, value) {
      return this.filters[field] && this.filters[field].includes(value);
    },
  },
};
</script>

<style scoped>
.sidebar {
  grid-area: sidebar;
  padding: 25px;
  font-size: 80%;
  background-color: white;
}

@media only screen and (max-width: 860px) {
  .sidebar {
    grid-area: sidebar;
    padding: 25px;
    font-size: 80%;
    transform: translateX(-100%);
    transition: transform 250ms ease-in;
    position: absolute;
    z-index: 2;
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .filters {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .colors {
    grid-column: 1;
    grid-row: 3;
  }

  .breeds {
    grid-column: 2 / span 2;
    grid-row: 3;
  }

  .breeds ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
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