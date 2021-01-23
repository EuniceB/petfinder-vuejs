<template>
  <div class="pet-item">
    <header>
      <span v-html="pet.name"></span>
      <font-awesome-icon
        v-if="pet.gender === 'Male'"
        icon="mars"
        :style="{ color: '#2547e1' }"
      />
      <font-awesome-icon
        v-if="pet.gender === 'Female'"
        icon="venus"
        :style="{ color: '#e1258e' }"
      />
    </header>
    <p class="date">{{ new Date(pet.published_at).toLocaleString() }}</p>
    <img
      v-if="pet.photos && pet.photos.length > 0"
      v-bind:src="pet.photos[0].medium"
    />
    <img
      class="no-photo"
      v-if="!pet.photos || pet.photos.length === 0"
      src="@/assets/dog.jpeg"
    />
    <p v-html="pet.description"></p>
    <div class="attributes">
      <p>Age: {{ pet.age }}</p>
      <p>Size: {{ pet.size }}</p>
    </div>
    <router-link
      :to="'pet/' + pet.id"
      class="btn btn-primary"
      v-bind:key="pet.id"
    >See more</router-link>
  </div>
</template>

<script>
export default {
  name: "PetItem",
  props: ["pet"],
  methods: {},
};
</script>

<style scoped>
.pet-item {
  background-color: #eaeaea;
  display: flex;
  position: relative;
  height: 100%;
  flex-direction: column;
  padding: 32px;
  border: 1px dotted #aaa;
}

.pet-item:hover {
  cursor: pointer;
}

.no-photo {
  display: inline-block;
  width: 100%;
  filter: grayscale(80%);
}

.pet-item > .btn {
  flex: 0 0 auto;
  text-align: center;
}

header {
  text-align: center;
  font-size: 16pt;
}

header span {
  display: inline-block;
  margin-right: 8px;
}

.attributes {
  font-size: small;
}

img {
  align-self: center;
  max-width: 100%;
}

.date {
  color: grey;
  text-align: center;
  font-size: 8pt;
}

.pet-item > * {
  display: inline-block;
  margin-bottom: 16px;
}
</style>