<template>
  <article class="pet-item card">
    <header>
      <h1 class="pet-name" v-html="pet.name"></h1>
      <font-awesome-icon
        v-if="pet.gender === 'Male'"
        icon="mars"
        :style="{ color: '#2547e1', fontSize: '16pt' }"
      />
      <font-awesome-icon
        v-if="pet.gender === 'Female'"
        icon="venus"
        :style="{ color: '#e1258e', fontSize: '16pt' }"
      />
    </header>
    <main>
      <p class="date">{{ new Date(pet.published_at).toLocaleString() }}</p>
      <div class="img-container">
        <img
          v-if="pet.photos && pet.photos.length > 0"
          v-bind:src="pet.photos[0].medium"
        />
        <img
          class="no-photo"
          v-if="!pet.photos || pet.photos.length === 0"
          src="@/assets/no-photo-available.jpeg"
        />
      </div>
      <p v-if="pet.description" class="pet-desc" v-html="pet.description"></p>
      <p v-if="!pet.description" class="pet-desc">
        No description was provided.
      </p>
      <router-link
        :to="'/pet/' + pet.id"
        class="btn btn-primary"
        v-bind:key="pet.id"
        >See more</router-link
      >
    </main>
  </article>
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
  display: flex;
  flex-direction: column;
  height: 100%; 
}

.pet-item:hover {
  cursor: pointer;
}

.no-photo {
  display: inline-block;
  filter: grayscale(80%);
}

.pet-item > .btn {
  text-align: center;
}

.pet-name {
  margin-right: 0.5em;
}

.pet-desc {
  flex-grow: 1;
}

.img-container {
  text-align: center;
  height: 300px;
}

img {
  height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.date {
  color: grey;
  text-align: center;
  font-size: 8pt;
}

main{
  position: relative;
  z-index: 1;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

main > *:not(:last-child) {
  margin-bottom: 3em;
}
</style>